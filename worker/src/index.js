// Aglaia 账号系统 v1 —— Cloudflare Pages Advanced Mode Worker（_worker.js）。
//
// 认证：邮箱 + 密码（2026-11-16 用户定案；magic link 与 GitHub OAuth
// 留待以后）。v1 没有邮箱验证（邮件服务未配，记为已知缺口，见运维笔记）。
//
// 前后端契约（完整说明见 docs/accounts.md）：
//   POST /api/auth/register  POST /api/auth/login  POST /api/auth/logout
//   GET  /api/auth/me
//   PATCH /api/account/profile  POST /api/account/avatar  POST /api/account/password
//   GET  /api/admin/users
//
// 安全红线：密码绝不记日志、绝不返回客户端；错误响应不泄露用户是否
// 存在（注册 409 除外——那是邮箱已被注册的明确信号）。

import {
  hashPassword,
  verifyPassword,
  newSessionToken,
  hashSessionToken,
  newUserId,
} from "./crypto.js";
import { ensureDb, publicUser } from "./db.js";

const SESSION_COOKIE = "aglaia_session";
const SESSION_TTL_SECONDS = 30 * 24 * 3600; // 30 天
const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2MB
const MAX_NICKNAME_LEN = 20;
const MAX_BIO_LEN = 200;
const MAX_PASSWORD_LEN = 128;
// 用户可选的 40 个预设头像 id，与 src/lib/avatars.mjs 的 AVATARS 保持一致
// （新增预设时两边同步改）。注意 "official" 不在其中——官方头像只属于
// official 账号，用户注册/换头像时传 official 会被拒绝（防冒充）。
const PRESET_IDS = new Set(["original","impressionism","post-impressionism","arts-and-crafts","art-nouveau","fauvism","expressionism","cubism","futurism","dadaism","surrealism","suprematism","constructivism","de-stijl","bauhaus","wiener-werkstatte","art-deco","abstract-expressionism","pop-art","minimalism","op-art","photorealism","swiss-style","brutalism","postmodernism","memphis","punk-diy","grunge","skeuomorphism","flat-design","neumorphism","material-design","glassmorphism","claymorphism","y2k","frutiger-aero","ukiyo-e","wabi-sabi","mingei","chinese-landscape"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- 速率限制 v1：内存滑动窗口（每个 isolate 独立）----
// 局限写在运维笔记里：多 isolate 下限额按 isolate 分摊、isolate 回收
// 后计数清零，只能挡随手刷的脚本，挡不住分布式攻击。v2 应改 D1 表
// 或 Cloudflare Rate Limiting 规则。
const rateBuckets = new Map(); // key: `${kind}:${ip}` -> number[]（毫秒时间戳）
function rateLimited(kind, ip, limit, windowMs) {
  const key = `${kind}:${ip}`;
  const now = Date.now();
  const stamps = (rateBuckets.get(key) || []).filter((t) => now - t < windowMs);
  if (stamps.length >= limit) {
    rateBuckets.set(key, stamps);
    return true;
  }
  stamps.push(now);
  rateBuckets.set(key, stamps);
  return false;
}

function clientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    (request.headers.get("X-Forwarded-For") || "").split(",")[0].trim() ||
    "unknown"
  );
}

// ---- 响应工具 ----
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  });
}

function err(code, message, status, field) {
  const body = { error: code, message };
  if (field) body.field = field;
  return json(body, status);
}

const DB_UNAVAILABLE = () =>
  err("db_unavailable", "数据库未配置，请稍后再试", 503);

// ---- Cookie ----
function getSessionToken(request) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === SESSION_COOKIE) return decodeURIComponent(rest.join("="));
  }
  return null;
}

function sessionSetCookie(token) {
  return (
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; ` +
    `SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`
  );
}

function sessionClearCookie() {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

// ---- 会话 ----
async function createSession(env, userId) {
  const token = newSessionToken();
  const id = await hashSessionToken(token);
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    "INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)",
  )
    .bind(id, userId, now + SESSION_TTL_SECONDS, now)
    .run();
  return token;
}

// 返回 { user, sessionId } 或 null。过期会话顺手删除。
async function getSessionUser(request, env) {
  const token = getSessionToken(request);
  if (!token) return null;
  const id = await hashSessionToken(token);
  const session = await env.DB.prepare(
    "SELECT user_id, expires_at FROM sessions WHERE id = ?",
  )
    .bind(id)
    .first();
  if (!session) return null;
  const now = Math.floor(Date.now() / 1000);
  if (session.expires_at <= now) {
    await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(id).run();
    return null;
  }
  const row = await env.DB.prepare(
    "SELECT id, nickname, email, avatar_type, avatar_preset_id, avatar_url, bio, role, created_at FROM users WHERE id = ?",
  )
    .bind(session.user_id)
    .first();
  if (!row) return null;
  return { user: publicUser(row), userId: row.id, sessionId: id };
}

async function fetchUserById(env, userId) {
  const row = await env.DB.prepare(
    "SELECT id, nickname, email, avatar_type, avatar_preset_id, avatar_url, bio, role, created_at FROM users WHERE id = ?",
  )
    .bind(userId)
    .first();
  return publicUser(row);
}

// ---- 校验 ----
function codePoints(s) {
  return [...s].length;
}

function validNickname(nickname) {
  return (
    typeof nickname === "string" &&
    nickname.trim().length > 0 &&
    codePoints(nickname.trim()) <= MAX_NICKNAME_LEN
  );
}

function validEmail(email) {
  return (
    typeof email === "string" &&
    email.length <= 254 &&
    EMAIL_RE.test(email.trim().toLowerCase())
  );
}

function validPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    password.length <= MAX_PASSWORD_LEN
  );
}

async function readJsonBody(request) {
  try {
    const data = await request.json();
    if (data === null || typeof data !== "object" || Array.isArray(data)) return null;
    return data;
  } catch {
    return null;
  }
}

// ---- 端点 ----

async function handleRegister(request, env) {
  if (rateLimited("register", clientIp(request), 5, 3600_000)) {
    return err("too_many_requests", "注册请求过于频繁，请一小时后再试", 429);
  }
  const body = await readJsonBody(request);
  if (!body) return err("bad_request", "请求体不是合法 JSON", 400);

  const nickname = typeof body.nickname === "string" ? body.nickname.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = body.password;
  const passwordConfirm = body.password_confirm;
  const avatarPresetId = body.avatar_preset_id;

  if (!validNickname(nickname)) {
    return err("validation_error", "昵称需为 1–20 个字", 400, "nickname");
  }
  if (!validEmail(email)) {
    return err("validation_error", "邮箱格式不正确", 400, "email");
  }
  if (!validPassword(password)) {
    return err("validation_error", "密码至少 8 位", 400, "password");
  }
  if (password !== passwordConfirm) {
    return err("validation_error", "两次输入的密码不一致", 400, "password_confirm");
  }
  if (
    avatarPresetId !== undefined &&
    avatarPresetId !== null &&
    (typeof avatarPresetId !== "string" || !PRESET_IDS.has(avatarPresetId))
  ) {
    return err("validation_error", "头像预设不存在", 400, "avatar_preset_id");
  }

  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first();
  if (existing) {
    return err("email_taken", "该邮箱已注册", 409, "email");
  }

  const now = Math.floor(Date.now() / 1000);
  const userId = newUserId();
  await env.DB.prepare(
    "INSERT INTO users (id, nickname, email, password_hash, avatar_type, avatar_preset_id, avatar_url, bio, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(
      userId,
      nickname,
      email,
      await hashPassword(password),
      "preset",
      avatarPresetId || null,
      null,
      "",
      "user",
      now,
    )
    .run();
  const token = await createSession(env, userId);
  const user = await fetchUserById(env, userId);
  return json({ user }, 201, { "Set-Cookie": sessionSetCookie(token) });
}

async function handleLogin(request, env) {
  if (rateLimited("login", clientIp(request), 10, 600_000)) {
    return err("too_many_requests", "登录尝试过于频繁，请 10 分钟后再试", 429);
  }
  const body = await readJsonBody(request);
  if (!body) return err("bad_request", "请求体不是合法 JSON", 400);

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = body.password;
  // 不区分「邮箱不存在」与「密码错误」：两种情况同一条 401。
  const badCredentials = () => err("invalid_credentials", "邮箱或密码不正确", 401);
  if (!validEmail(email) || typeof password !== "string" || password.length === 0) {
    return badCredentials();
  }
  const row = await env.DB.prepare(
    "SELECT id, nickname, email, password_hash, avatar_type, avatar_preset_id, avatar_url, bio, role, created_at FROM users WHERE email = ?",
  )
    .bind(email)
    .first();
  if (!row) return badCredentials();
  if (!(await verifyPassword(password, row.password_hash))) return badCredentials();

  // 顺手清掉该用户的过期会话。
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND expires_at < ?")
    .bind(row.id, now)
    .run();
  const token = await createSession(env, row.id);
  return json({ user: publicUser(row) }, 200, { "Set-Cookie": sessionSetCookie(token) });
}

async function handleLogout(request, env) {
  const token = getSessionToken(request);
  if (token) {
    const id = await hashSessionToken(token);
    await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(id).run();
  }
  return json({ ok: true }, 200, { "Set-Cookie": sessionClearCookie() });
}

async function handleProfile(request, env, session) {
  const body = await readJsonBody(request);
  if (!body) return err("bad_request", "请求体不是合法 JSON", 400);
  const updates = {};
  if (body.nickname !== undefined) {
    const nickname = typeof body.nickname === "string" ? body.nickname.trim() : "";
    if (!validNickname(nickname)) {
      return err("validation_error", "昵称需为 1–20 个字", 400, "nickname");
    }
    updates.nickname = nickname;
  }
  if (body.bio !== undefined) {
    if (typeof body.bio !== "string" || codePoints(body.bio) > MAX_BIO_LEN) {
      return err("validation_error", "简介不能超过 200 个字", 400, "bio");
    }
    updates.bio = body.bio;
  }
  if (Object.keys(updates).length === 0) {
    return json({ user: session.user });
  }
  const current = await env.DB.prepare(
    "SELECT nickname, bio FROM users WHERE id = ?",
  )
    .bind(session.userId)
    .first();
  const nickname = updates.nickname !== undefined ? updates.nickname : current.nickname;
  const bio = updates.bio !== undefined ? updates.bio : current.bio;
  await env.DB.prepare("UPDATE users SET nickname = ?, bio = ? WHERE id = ?")
    .bind(nickname, bio, session.userId)
    .run();
  const user = await fetchUserById(env, session.userId);
  return json({ user });
}

// 只认文件魔数，不信扩展名与客户端声明的 MIME。
function detectImageType(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return "image/png";
  }
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

function bytesToBase64(bytes) {
  let s = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    s += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(s);
}

async function handleAvatar(request, env, session) {
  const contentType = request.headers.get("Content-Type") || "";
  let avatarType;
  let presetId = null;
  let avatarUrl = null;

  if (contentType.includes("application/json")) {
    const body = await readJsonBody(request);
    if (!body) return err("bad_request", "请求体不是合法 JSON", 400);
    if (typeof body.avatar_preset_id !== "string" || !PRESET_IDS.has(body.avatar_preset_id)) {
      return err("validation_error", "头像预设不存在", 400, "avatar_preset_id");
    }
    avatarType = "preset";
    presetId = body.avatar_preset_id;
  } else if (contentType.includes("multipart/form-data")) {
    let form;
    try {
      form = await request.formData();
    } catch {
      return err("bad_request", "无法解析上传内容", 400);
    }
    const file = form.get("file");
    if (!file || typeof file.arrayBuffer !== "function") {
      return err("validation_error", "请选择要上传的图片文件", 400, "file");
    }
    if (file.size > MAX_AVATAR_BYTES) {
      return err("payload_too_large", "头像文件不能超过 2MB", 413, "file");
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const mime = detectImageType(bytes);
    if (!mime) {
      return err("invalid_image", "仅支持 JPG / PNG / WebP 图片", 400, "file");
    }
    // v1 折中：Workers 里没有服务端图片处理库，直接存原图 data URL，
    // 前端用 CSS 圆形裁剪显示。R2 迁移 + 服务端裁剪见运维笔记。
    avatarType = "custom";
    avatarUrl = `data:${mime};base64,${bytesToBase64(bytes)}`;
  } else {
    return err("bad_request", "请用 JSON（选预设）或 multipart（上传文件）提交", 400);
  }

  await env.DB.prepare(
    "UPDATE users SET avatar_type = ?, avatar_preset_id = ?, avatar_url = ? WHERE id = ?",
  )
    .bind(avatarType, presetId, avatarUrl, session.userId)
    .run();
  const user = await fetchUserById(env, session.userId);
  return json({ user });
}

async function handlePassword(request, env, session) {
  const body = await readJsonBody(request);
  if (!body) return err("bad_request", "请求体不是合法 JSON", 400);
  const { current_password, new_password, new_password_confirm } = body;
  if (typeof current_password !== "string" || current_password.length === 0) {
    return err("validation_error", "请填写当前密码", 400, "current_password");
  }
  if (!validPassword(new_password)) {
    return err("validation_error", "新密码至少 8 位", 400, "new_password");
  }
  if (new_password !== new_password_confirm) {
    return err("validation_error", "两次输入的新密码不一致", 400, "new_password_confirm");
  }
  const row = await env.DB.prepare("SELECT password_hash FROM users WHERE id = ?")
    .bind(session.userId)
    .first();
  if (!row || !(await verifyPassword(current_password, row.password_hash))) {
    return err("invalid_credentials", "当前密码不正确", 401, "current_password");
  }
  await env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?")
    .bind(await hashPassword(new_password), session.userId)
    .run();
  // 改密后吊销该用户的其他会话（当前会话保留）。
  await env.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND id != ?")
    .bind(session.userId, session.sessionId)
    .run();
  return json({ ok: true });
}

async function handleAdminUsers(request, env, session) {
  if (session.user.role !== "admin") {
    return err("forbidden", "没有权限", 403);
  }
  const url = new URL(request.url);
  const page = Math.max(1, Number.parseInt(url.searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number.parseInt(url.searchParams.get("limit") || "20", 10) || 20),
  );
  const offset = (page - 1) * limit;
  const countRow = await env.DB.prepare("SELECT COUNT(*) AS total FROM users").first();
  const { results } = await env.DB.prepare(
    "SELECT id, nickname, email, avatar_type, avatar_preset_id, avatar_url, role, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?",
  )
    .bind(limit, offset)
    .all();
  return json({
    total: countRow ? countRow.total : 0,
    page,
    limit,
    users: (results || []).map((row) => publicUser({ ...row, bio: "" })),
  });
}

// ---- 路由 ----

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      // 非 /api/* 请求本应由 _routes.json 直接走静态资源；这里是兜底：
      // 万一 _routes.json 失效，worker 仍把静态资源原样交回去。
      if (!path.startsWith("/api/")) {
        if (env.ASSETS) return env.ASSETS.fetch(request);
        return err("not_found", "接口不存在", 404);
      }

      // /api/auth/me 未带 Cookie 时无需查库即可判定未登录——这样即使
      // D1 未绑定，匿名访问也能拿到正确的 401（而不是 503）。
      if (path === "/api/auth/me" && request.method === "GET" && !getSessionToken(request)) {
        return err("unauthorized", "未登录", 401);
      }
      // 登出无 Cookie 时也是幂等的 200，无需查库。
      if (path === "/api/auth/logout" && request.method === "POST" && !getSessionToken(request)) {
        return json({ ok: true }, 200, { "Set-Cookie": sessionClearCookie() });
      }

      // 其余 API 都需要数据库。未绑定时给明确的 503，不崩 500。
      let dbReady = false;
      try {
        dbReady = await ensureDb(env);
      } catch (e) {
        console.error("db migration failed", e && e.message ? e.message : e);
        return err("internal_error", "服务暂时不可用", 500);
      }
      if (!dbReady) return DB_UNAVAILABLE();

      if (path === "/api/auth/register" && request.method === "POST") {
        return handleRegister(request, env);
      }
      if (path === "/api/auth/login" && request.method === "POST") {
        return handleLogin(request, env);
      }
      if (path === "/api/auth/logout" && request.method === "POST") {
        return handleLogout(request, env);
      }
      if (path === "/api/auth/me" && request.method === "GET") {
        const session = await getSessionUser(request, env);
        if (!session) return err("unauthorized", "未登录", 401);
        return json({ user: session.user });
      }

      // 以下接口都需要登录。
      const needsAuth =
        (path === "/api/account/profile" && request.method === "PATCH") ||
        (path === "/api/account/avatar" && request.method === "POST") ||
        (path === "/api/account/password" && request.method === "POST") ||
        (path === "/api/admin/users" && request.method === "GET");
      if (needsAuth) {
        const session = await getSessionUser(request, env);
        if (!session) return err("unauthorized", "未登录", 401);
        if (path === "/api/account/profile") return handleProfile(request, env, session);
        if (path === "/api/account/avatar") return handleAvatar(request, env, session);
        if (path === "/api/account/password") return handlePassword(request, env, session);
        if (path === "/api/admin/users") return handleAdminUsers(request, env, session);
      }

      return err("not_found", "接口不存在", 404);
    } catch (e) {
      // 兜底：绝不把内部错误细节（更不要说请求体）泄露给客户端。
      console.error("unhandled worker error", e && e.message ? e.message : e);
      return err("internal_error", "服务暂时不可用", 500);
    }
  },
};
