// Aglaia 账号 worker 单元测试（node:test + 内存 mock D1）。
// 用法：node --test worker/test/api.test.mjs（仓库根目录）。
// 注意：worker 的速率限制与迁移状态是模块级内存；每个用例用
// __resetMigrationForTests() + 全新 MockD1 + 唯一 IP 隔离。
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import worker from "../src/index.js";
import { __resetMigrationForTests, OFFICIAL_EMAIL, OFFICIAL_PASSWORD_HASH } from "../src/db.js";
import { MIGRATION_SQL } from "../src/migration-sql.js";
import { verifyPassword } from "../src/crypto.js";
import { MockD1 } from "./mock-d1.mjs";

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
let ipCounter = 0;

function freshEnv() {
  __resetMigrationForTests();
  return { DB: new MockD1() };
}

// 默认每次调用换一个新 IP，避免速率限制在用例间串扰；
// 需要测限流的用例显式传 ip。
async function call(env, method, path, opts = {}) {
  const ip = opts.ip || `10.200.0.${++ipCounter}`;
  const headers = { "CF-Connecting-IP": ip, ...(opts.headers || {}) };
  let body;
  if (opts.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.json);
  } else if (opts.form !== undefined) {
    body = opts.form; // FormData：fetch 会自己填 multipart Content-Type
  }
  if (opts.cookie) headers.Cookie = opts.cookie;
  const req = new Request(`https://aglaia.design${path}`, { method, headers, body });
  const res = await worker.fetch(req, env);
  let data = null;
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }
  return { status: res.status, data, text, headers: res.headers };
}

function cookieOf(res) {
  const setCookie = res.headers.get("Set-Cookie") || "";
  return setCookie.split(";")[0]; // "aglaia_session=..."
}

async function register(env, overrides = {}) {
  const n = ++ipCounter;
  return call(env, "POST", "/api/auth/register", {
    json: {
      nickname: "测试用户",
      email: `user${n}@example.com`,
      password: "password123",
      password_confirm: "password123",
      ...overrides,
    },
  });
}

test("迁移 SQL 文件与 worker 内联的 SQL 一致", () => {
  const fileSql = readFileSync(join(TEST_DIR, "..", "migrations", "0001_init.sql"), "utf8");
  assert.equal(MIGRATION_SQL, fileSql);
});

test("注册成功：201 + user 对象 + 会话 Cookie，且不含 password_hash", async () => {
  const env = freshEnv();
  const res = await register(env, { nickname: "阿甲", avatar_preset_id: "original" });
  assert.equal(res.status, 201);
  assert.equal(res.data.user.nickname, "阿甲");
  assert.equal(res.data.user.email, res.data.user.email.toLowerCase());
  assert.equal(res.data.user.avatar_url, "/brand/avatars/original.webp");
  assert.equal(res.data.user.role, "user");
  assert.ok(res.data.user.id);
  assert.ok(res.data.user.created_at);
  assert.ok(!("password_hash" in res.data.user));
  assert.ok(!res.text.includes("password123"), "响应里不得出现密码");
  const setCookie = res.headers.get("Set-Cookie") || "";
  assert.match(setCookie, /^aglaia_session=/);
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /Secure/);
  assert.match(setCookie, /SameSite=Lax/);
  assert.match(setCookie, /Max-Age=2592000/);

  const me = await call(env, "GET", "/api/auth/me", { cookie: cookieOf(res) });
  assert.equal(me.status, 200);
  assert.equal(me.data.user.id, res.data.user.id);
});

test("注册校验：昵称/邮箱/密码/确认/预设各错一处都 400", async () => {
  const env = freshEnv();
  const cases = [
    [{ nickname: "" }, "nickname"],
    [{ nickname: "x".repeat(21) }, "nickname"],
    [{ email: "not-an-email" }, "email"],
    [{ password: "short", password_confirm: "short" }, "password"],
    [{ password_confirm: "different123" }, "password_confirm"],
    [{ avatar_preset_id: "bad id!" }, "avatar_preset_id"],
  ];
  for (const [overrides, field] of cases) {
    const res = await register(env, overrides);
    assert.equal(res.status, 400, JSON.stringify(res.data));
    assert.equal(res.data.error, "validation_error");
    assert.equal(res.data.field, field);
  }
});

test("注册重复邮箱：409", async () => {
  const env = freshEnv();
  const first = await register(env, { email: "dup@example.com" });
  assert.equal(first.status, 201);
  const second = await register(env, { email: "dup@example.com", nickname: "另一个" });
  assert.equal(second.status, 409);
  assert.equal(second.data.error, "email_taken");
});

test("登录：成功 200；密码错与邮箱不存在都是同一条 401", async () => {
  const env = freshEnv();
  await register(env, { email: "login@example.com" });
  const ok = await call(env, "POST", "/api/auth/login", {
    json: { email: "login@example.com", password: "password123" },
  });
  assert.equal(ok.status, 200);
  assert.equal(ok.data.user.email, "login@example.com");
  assert.ok(cookieOf(ok).startsWith("aglaia_session="));

  const wrongPw = await call(env, "POST", "/api/auth/login", {
    json: { email: "login@example.com", password: "wrongpassword" },
  });
  const noUser = await call(env, "POST", "/api/auth/login", {
    json: { email: "ghost@example.com", password: "wrongpassword" },
  });
  assert.equal(wrongPw.status, 401);
  assert.equal(noUser.status, 401);
  assert.deepEqual(wrongPw.data, noUser.data, "两种失败的响应必须完全一致");
});

test("me：无 Cookie 401；伪造 token 401；过期会话 401 并被清理", async () => {
  const env = freshEnv();
  const noCookie = await call(env, "GET", "/api/auth/me");
  assert.equal(noCookie.status, 401);
  assert.equal(noCookie.data.error, "unauthorized");

  const bogus = await call(env, "GET", "/api/auth/me", { cookie: "aglaia_session=bogus" });
  assert.equal(bogus.status, 401);

  const reg = await register(env);
  const cookie = cookieOf(reg);
  assert.equal((await call(env, "GET", "/api/auth/me", { cookie })).status, 200);
  // 手动把会话改过期
  for (const s of env.DB.sessions.values()) s.expires_at = 1;
  const expired = await call(env, "GET", "/api/auth/me", { cookie });
  assert.equal(expired.status, 401);
  assert.equal(env.DB.sessions.size, 0, "过期会话应被删除");
});

test("登出：200 + 清 Cookie，会话失效", async () => {
  const env = freshEnv();
  const reg = await register(env);
  const cookie = cookieOf(reg);
  const out = await call(env, "POST", "/api/auth/logout", { cookie });
  assert.equal(out.status, 200);
  assert.match(out.headers.get("Set-Cookie") || "", /Max-Age=0/);
  assert.equal(env.DB.sessions.size, 0);
  assert.equal((await call(env, "GET", "/api/auth/me", { cookie })).status, 401);

  const noCookie = await call(env, "POST", "/api/auth/logout");
  assert.equal(noCookie.status, 200, "无 Cookie 登出也是幂等 200");
});

test("改资料：昵称与简介可改；超长昵称 400；未登录 401", async () => {
  const env = freshEnv();
  const reg = await register(env);
  const cookie = cookieOf(reg);
  const ok = await call(env, "PATCH", "/api/account/profile", {
    cookie,
    json: { nickname: "新名字", bio: "你好世界" },
  });
  assert.equal(ok.status, 200);
  assert.equal(ok.data.user.nickname, "新名字");
  assert.equal(ok.data.user.bio, "你好世界");

  const bad = await call(env, "PATCH", "/api/account/profile", {
    cookie,
    json: { nickname: "x".repeat(21) },
  });
  assert.equal(bad.status, 400);
  assert.equal(bad.data.field, "nickname");

  const anon = await call(env, "PATCH", "/api/account/profile", {
    json: { nickname: "谁" },
  });
  assert.equal(anon.status, 401);
});

test("头像：JSON 选预设返回 /brand/avatars/<id>.webp；非法预设 400", async () => {
  const env = freshEnv();
  const reg = await register(env);
  const cookie = cookieOf(reg);
  const ok = await call(env, "POST", "/api/account/avatar", {
    cookie,
    json: { avatar_preset_id: "bauhaus" },
  });
  assert.equal(ok.status, 200);
  assert.equal(ok.data.user.avatar_url, "/brand/avatars/bauhaus.webp");

  const bad = await call(env, "POST", "/api/account/avatar", {
    cookie,
    json: { avatar_preset_id: "../etc" },
  });
  assert.equal(bad.status, 400);
});

test("头像上传：PNG 魔数通过存 data URL；文本文件 400；超 2MB 413", async () => {
  const env = freshEnv();
  const reg = await register(env);
  const cookie = cookieOf(reg);

  // 1x1 PNG 的真实文件头（魔数 + 最小结构即可，worker 只验魔数）。
  const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
  const form = new FormData();
  form.append("file", new Blob([pngBytes], { type: "image/png" }), "avatar.png");
  const ok = await call(env, "POST", "/api/account/avatar", { cookie, form });
  assert.equal(ok.status, 200);
  assert.ok(ok.data.user.avatar_url.startsWith("data:image/png;base64,"));

  // 扩展名是 .png 但内容是文本：魔数校验必须拦下。
  const fake = new FormData();
  fake.append("file", new Blob(["hello world, not an image"], { type: "image/png" }), "evil.png");
  const bad = await call(env, "POST", "/api/account/avatar", { cookie, form: fake });
  assert.equal(bad.status, 400);
  assert.equal(bad.data.error, "invalid_image");

  const big = new FormData();
  big.append("file", new Blob([new Uint8Array(2 * 1024 * 1024 + 1)]), "big.png");
  const tooBig = await call(env, "POST", "/api/account/avatar", { cookie, form: big });
  assert.equal(tooBig.status, 413);
});

test("改密码：当前密码错 401；成功后旧密码失效、新密码可用、其他会话被吊销", async () => {
  const env = freshEnv();
  const reg = await register(env, { email: "pw@example.com" });
  const cookieA = cookieOf(reg);
  const loginB = await call(env, "POST", "/api/auth/login", {
    json: { email: "pw@example.com", password: "password123" },
  });
  const cookieB = cookieOf(loginB);
  assert.notEqual(cookieA, cookieB);

  const wrong = await call(env, "POST", "/api/account/password", {
    cookie: cookieA,
    json: {
      current_password: "nope-nope-nope",
      new_password: "newpassword123",
      new_password_confirm: "newpassword123",
    },
  });
  assert.equal(wrong.status, 401);

  const ok = await call(env, "POST", "/api/account/password", {
    cookie: cookieA,
    json: {
      current_password: "password123",
      new_password: "newpassword123",
      new_password_confirm: "newpassword123",
    },
  });
  assert.equal(ok.status, 200);

  // 当前会话保留，其他会话吊销
  assert.equal((await call(env, "GET", "/api/auth/me", { cookie: cookieA })).status, 200);
  assert.equal((await call(env, "GET", "/api/auth/me", { cookie: cookieB })).status, 401);

  const oldLogin = await call(env, "POST", "/api/auth/login", {
    json: { email: "pw@example.com", password: "password123" },
  });
  assert.equal(oldLogin.status, 401);
  const newLogin = await call(env, "POST", "/api/auth/login", {
    json: { email: "pw@example.com", password: "newpassword123" },
  });
  assert.equal(newLogin.status, 200);
});

test("管理员列表：未登录 401；普通用户 403；admin 200 且不含 password_hash", async () => {
  const env = freshEnv();
  const anon = await call(env, "GET", "/api/admin/users");
  assert.equal(anon.status, 401);

  const reg = await register(env);
  const userCookie = cookieOf(reg);
  const forbidden = await call(env, "GET", "/api/admin/users", { cookie: userCookie });
  assert.equal(forbidden.status, 403);

  // 直接把该用户提为 admin（模拟运维笔记里的 UPDATE 命令）
  const row = [...env.DB.users.values()].find((u) => u.id === reg.data.user.id);
  row.role = "admin";
  const ok = await call(env, "GET", "/api/admin/users?page=1&limit=20", { cookie: userCookie });
  assert.equal(ok.status, 200);
  assert.ok(ok.data.total >= 2, "至少有官方账号 + 该用户");
  assert.ok(Array.isArray(ok.data.users));
  assert.ok(!ok.text.includes("password_hash"));
  assert.ok(!ok.text.includes("pbkdf2$"));
  const adminEntry = ok.data.users.find((u) => u.id === reg.data.user.id);
  assert.equal(adminEntry.role, "admin");
  assert.equal(adminEntry.email, reg.data.user.email);
});

test("官方账号：首次请求后自动种子入库，role=official，哈希格式正确", async () => {
  const env = freshEnv();
  assert.equal(env.DB.users.size, 0);
  await call(env, "GET", "/api/auth/me", { cookie: "aglaia_session=x" });
  const official = [...env.DB.users.values()].find((u) => u.email === OFFICIAL_EMAIL);
  assert.ok(official, "官方账号应由懒迁移种子插入");
  assert.equal(official.role, "official");
  assert.equal(official.nickname, "阿格莱亚");
  assert.equal(official.avatar_preset_id, "official");
  assert.match(official.password_hash, /^pbkdf2\$100000\$/);
  assert.equal(official.password_hash, OFFICIAL_PASSWORD_HASH);
  assert.equal(await verifyPassword("definitely-not-the-password", official.password_hash), false);

  // 第二次迁移不重复插入
  __resetMigrationForTests();
  await call(env, "GET", "/api/auth/me", { cookie: "aglaia_session=x" });
  const count = [...env.DB.users.values()].filter((u) => u.email === OFFICIAL_EMAIL).length;
  assert.equal(count, 1);
});

test("速率限制：同一 IP 第 11 次登录尝试返回 429", async () => {
  const env = freshEnv();
  const ip = "10.99.99.99";
  let last;
  for (let i = 0; i < 11; i++) {
    last = await call(env, "POST", "/api/auth/login", {
      ip,
      json: { email: "ghost@example.com", password: "x".repeat(8) },
    });
  }
  assert.equal(last.status, 429);
  assert.equal(last.data.error, "too_many_requests");
});

test("无 D1 绑定：注册/登录返回 503 db_unavailable；无 Cookie 的 me 仍是 401", async () => {
  __resetMigrationForTests();
  const env = {}; // 没有 DB 绑定
  const reg = await call(env, "POST", "/api/auth/register", {
    json: {
      nickname: "谁",
      email: "a@b.com",
      password: "password123",
      password_confirm: "password123",
    },
  });
  assert.equal(reg.status, 503);
  assert.equal(reg.data.error, "db_unavailable");

  const login = await call(env, "POST", "/api/auth/login", {
    json: { email: "a@b.com", password: "password123" },
  });
  assert.equal(login.status, 503);

  const meAnon = await call(env, "GET", "/api/auth/me");
  assert.equal(meAnon.status, 401, "无 Cookie 时无需查库即可判 401");

  const meWithCookie = await call(env, "GET", "/api/auth/me", {
    cookie: "aglaia_session=x",
  });
  assert.equal(meWithCookie.status, 503, "有 Cookie 但无库时只能报 503");
});

test("未知 API 路由 404；非 /api/* 路径无 ASSETS 时 404", async () => {
  const env = freshEnv();
  const unknown = await call(env, "GET", "/api/nope");
  assert.equal(unknown.status, 404);
  const page = await call(env, "GET", "/library");
  assert.equal(page.status, 404);
});

test("PBKDF2：同一密码每次哈希不同（salt 独立），验证往返正确", async () => {
  const { hashPassword } = await import("../src/crypto.js");
  const h1 = await hashPassword("same-password");
  const h2 = await hashPassword("same-password");
  assert.notEqual(h1, h2, "salt 不同，哈希必须不同");
  assert.equal(await verifyPassword("same-password", h1), true);
  assert.equal(await verifyPassword("same-password", h2), true);
  assert.equal(await verifyPassword("other-password", h1), false);
  assert.equal(await verifyPassword("same-password", "garbage"), false);
});
