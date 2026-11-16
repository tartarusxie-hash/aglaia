// 密码与会话 token 的密码学原语 —— 只用 WebCrypto，可在 Cloudflare
// Workers 与 Node >= 19（globalThis.crypto）里原样运行，因此单元测试
// 与生成官方账号哈希的脚本都直接复用同一份实现。
//
// 密码存储格式：pbkdf2$<迭代数>$<salt base64url>$<hash base64url>
//   算法 PBKDF2-HMAC-SHA-256，迭代 100000 次，每用户独立 16 字节 salt，
//   导出 32 字节哈希。参数写在格式里，将来升级迭代数可逐用户重哈希。

export const PBKDF2_ITERATIONS = 100000;
const SALT_BYTES = 16;
const HASH_BYTES = 32;
const TOKEN_BYTES = 32;

function bytesToB64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function b64urlToBytes(s) {
  s = s.replaceAll("-", "+").replaceAll("_", "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToHex(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// 定长比较，避免时序侧信道泄露哈希前缀。
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function deriveKey(password, salt, iterations) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    key,
    HASH_BYTES * 8,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await deriveKey(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${bytesToB64url(salt)}$${bytesToB64url(hash)}`;
}

export async function verifyPassword(password, stored) {
  try {
    const parts = stored.split("$");
    if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
    const iterations = Number.parseInt(parts[1], 10);
    if (!Number.isInteger(iterations) || iterations < 1 || iterations > 1000000) return false;
    const salt = b64urlToBytes(parts[2]);
    const expected = b64urlToBytes(parts[3]);
    const actual = await deriveKey(password, salt, iterations);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

// 会话 token：32 字节随机，base64url 编码后放进 Cookie；
// 数据库里只存它的 SHA-256 摘要（见 sessions 表注释）。
export function newSessionToken() {
  return bytesToB64url(crypto.getRandomValues(new Uint8Array(TOKEN_BYTES)));
}

export async function hashSessionToken(token) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );
  return bytesToHex(new Uint8Array(digest));
}

export function newUserId() {
  return `usr_${crypto.randomUUID()}`;
}
