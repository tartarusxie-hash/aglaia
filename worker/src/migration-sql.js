// 由 worker/scripts/build-worker.mjs 从 migrations/0001_init.sql 自动生成，请勿手改。
export const MIGRATION_SQL = `-- Aglaia 账号系统 v1：D1 初始化迁移（0001）
--
-- 来源：worker/src/db.js 的懒迁移在首次处理 API 请求时执行与此相同的内容
-- （CREATE TABLE IF NOT EXISTS，幂等）。本文件是备查的权威 DDL；
-- worker/scripts/build-worker.mjs 会在每次打包时把本文件内联进 worker，
-- 两边由单元测试钉住一致。
--
-- 官方账号（role=official）的种子插入不在这里——它的密码哈希以常量
-- 放在 worker/src/db.js 里，懒迁移时用参数化 INSERT … WHERE NOT EXISTS
-- 写入，避免哈希散落在两个地方。
--
-- 注意：D1 由用户在仪表盘手工建库（API 令牌无 D1 权限），建库后无需
-- 手动跑本文件；但如果想在 D1 控制台预先建表，直接粘贴本文件即可。

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  nickname TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_type TEXT NOT NULL DEFAULT 'preset' CHECK (avatar_type IN ('preset', 'custom')),
  avatar_preset_id TEXT,
  avatar_url TEXT,
  bio TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'official')),
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at DESC);

-- 会话放 D1（v1 不用 KV，少一个用户要建的资源）。
-- id 是会话 token 的 SHA-256 hex 摘要（token 明文只存在 Cookie 里，
-- 数据库泄露也不会直接冒充会话）。
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);
`;
