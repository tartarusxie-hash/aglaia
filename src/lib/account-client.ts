// 账号后端 API 客户端（浏览器侧）。后端是 Cloudflare Pages Functions，
// 按契约提供 /api/auth/* 与 /api/account/*、/api/admin/*；Cookie 会话，全部请求带 credentials。
// 注意：本地构建验证时没有后端，fetch 会失败或返回 404 —— 调用方必须把
// ApiError(status !== 401) 与网络错误都当成「服务暂不可用」，不要当成未登录。

export interface User {
  id: string;
  nickname: string;
  email: string;
  avatar_url: string;
  bio: string;
  role: string;
  created_at: string;
}

export class ApiError extends Error {
  status: number;
  field?: string;
  constructor(status: number, message: string, field?: string) {
    super(message);
    this.status = status;
    this.field = field;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(path, { credentials: "include", ...init });
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // 非 JSON 响应（如静态服务器的 404 页面）：按状态码处理
  }
  if (!res.ok) {
    throw new ApiError(res.status, (data && data.error) || res.statusText || "request failed", data && data.field);
  }
  return data as T;
}

const json = (body: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getMe = () => request<{ user: User }>("/api/auth/me").then((r) => r.user);

export const login = (email: string, password: string) =>
  request<{ user: User }>("/api/auth/login", json({ email, password })).then((r) => r.user);

export const register = (data: {
  nickname: string;
  email: string;
  password: string;
  password_confirm: string;
  avatar_preset_id?: string;
}) => request<{ user: User }>("/api/auth/register", json(data)).then((r) => r.user);

export const logout = () => request("/api/auth/logout", { method: "POST" });

export const updateProfile = (data: { nickname?: string; bio?: string }) =>
  request<{ user: User }>("/api/account/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.user);

export const setAvatarPreset = (avatar_preset_id: string) =>
  request<{ user: User }>("/api/account/avatar", json({ avatar_preset_id })).then((r) => r.user);

export const uploadAvatar = (file: File) => {
  const fd = new FormData();
  // 字段名须与后端一致：worker/src/index.js 用 form.get("file") 取文件。
  fd.append("file", file);
  return request<{ user: User }>("/api/account/avatar", { method: "POST", body: fd }).then((r) => r.user);
};

export const changePassword = (data: {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}) => request("/api/account/password", json(data));

export interface AdminUser {
  id: string;
  nickname: string;
  email: string;
  avatar_url: string;
  role: string;
  created_at: string;
}

export const listUsers = (page = 1, limit = 50) =>
  request<{ total: number; users: AdminUser[] }>(`/api/admin/users?page=${page}&limit=${limit}`);

/** 昵称首字的 SVG 头像 data URL（avatar_url 缺失或图片加载失败时的兜底）。 */
export function initialAvatar(nickname: string): string {
  const ch = (nickname || "?").trim().charAt(0) || "?";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#141414"/><text x="48" y="64" font-size="44" font-family="sans-serif" fill="#fff" text-anchor="middle">${ch.replace(/[<>&"']/g, "")}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** 加入/注册日期：zh 用 2026年11月16日，en 用 Nov 16, 2026。 */
export function formatDate(iso: string, lang: "zh" | "en"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return lang === "en"
    ? d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 通知站点头部等监听者重新拉取登录状态。 */
export function notifyAuthChanged() {
  window.dispatchEvent(new CustomEvent("aglaia:auth-changed"));
}
