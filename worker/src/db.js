// D1 访问层：懒迁移 + 官方账号种子 + user 对象映射。
//
// 懒迁移：worker 首次处理需要数据库的 API 请求时执行 CREATE TABLE
// IF NOT EXISTS（幂等）。这样用户在仪表盘建库并绑定后，无需再跑 SQL。
// DDL 的权威来源是 worker/migrations/0001_init.sql，打包脚本把它内联
// 成 migration-sql.js（单元测试钉住两者一致）。

import { MIGRATION_SQL } from "./migration-sql.js";

// ---- 官方账号（role=official）----
// 昵称「阿格莱亚」，邮箱 official@aglaia.design 是占位（v1 不发邮件）。
// 头像 /brand/avatars/official.webp 由头像组提供。
// 密码哈希由 worker/scripts/gen-official-hash.mjs 生成并写进下面这个
// 常量；明文密码只在交付汇报里出现一次，不进仓库、不进任何文件。
// 哈希本身是带 salt 的 PBKDF2 结果，公开在源码里是可接受的（与
// Unix /etc/shadow 的思路相同），但仍请勿把明文密码写进任何地方。
export const OFFICIAL_EMAIL = "official@aglaia.design";
export const OFFICIAL_NICKNAME = "阿格莱亚";
export const OFFICIAL_USER_ID = "usr_official";
export const OFFICIAL_AVATAR_PRESET_ID = "official";
export const OFFICIAL_PASSWORD_HASH = "pbkdf2$100000$MeoWXV9MUiLBiey5HxveSw$KDfv0SLNNGAr1y7Kj3wwjgFN1OoVM5ok9HdEVVeiUvE";

const OFFICIAL_SEED_SQL = `
INSERT INTO users (id, nickname, email, password_hash, avatar_type, avatar_preset_id, role, created_at)
SELECT ?, ?, ?, ?, 'preset', ?, 'official', ?
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = ?)
`;

// D1 的 exec() 会把输入按行切分后逐行发给数据库（workerd 实现，
// 见 cloudflare/workerd 的 D1DatabaseSession.exec），多行 CREATE TABLE
// 会被切碎成 "incomplete input" 而失败（2026-11-19 真实 D1 上实测，
// 单元测试的 mock exec 照单全收所以没暴露）。因此迁移改为逐条
// prepare().run()；拆分时先去掉 -- 注释行，再按 ; 切分。
export function splitMigrationStatements(sql) {
  const withoutComments = sql
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n");
  return withoutComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// 每个 isolate 只迁移一次；失败时清掉缓存，下个请求重试。
let migratePromise = null;

export async function ensureDb(env) {
  if (!env.DB) return false;
  if (!migratePromise) {
    migratePromise = (async () => {
      for (const stmt of splitMigrationStatements(MIGRATION_SQL)) {
        await env.DB.prepare(stmt).run();
      }
      const now = Math.floor(Date.now() / 1000);
      await env.DB.prepare(OFFICIAL_SEED_SQL)
        .bind(
          OFFICIAL_USER_ID,
          OFFICIAL_NICKNAME,
          OFFICIAL_EMAIL,
          OFFICIAL_PASSWORD_HASH,
          OFFICIAL_AVATAR_PRESET_ID,
          now,
          OFFICIAL_EMAIL,
        )
        .run();
    })().catch((err) => {
      migratePromise = null;
      throw err;
    });
  }
  await migratePromise;
  return true;
}

// 供单元测试在每个用例前重置迁移状态（生产代码不调用）。
export function __resetMigrationForTests() {
  migratePromise = null;
}

// ---- user 对象映射（前后端契约）----
// DB 行 → 对外 user 对象。password_hash 永远不离开这一层。
// avatar_url：预设返回 /brand/avatars/<id>.webp；自定义返回存着的
// data URL；未设置返回 null（前端用默认头像/首字母兜底）。
export function publicUser(row) {
  if (!row) return null;
  let avatarUrl = null;
  if (row.avatar_type === "custom" && row.avatar_url) {
    avatarUrl = row.avatar_url;
  } else if (row.avatar_preset_id) {
    avatarUrl = `/brand/avatars/${row.avatar_preset_id}.webp`;
  }
  return {
    id: row.id,
    nickname: row.nickname,
    email: row.email,
    avatar_url: avatarUrl,
    bio: row.bio || "",
    role: row.role,
    created_at: new Date(row.created_at * 1000).toISOString(),
  };
}
