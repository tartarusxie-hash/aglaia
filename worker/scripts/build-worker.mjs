// 打包账号 worker：
//   1. 把 worker/migrations/0001_init.sql 内联成 worker/src/migration-sql.js
//      （懒迁移的 DDL 来源，单源头；单元测试钉住两者一致）。
//   2. 用 esbuild 把 worker/src/index.js 打包成 dist/_worker.js（单文件
//      ESM，Cloudflare Pages Advanced Mode 入口）。
//   3. 写 dist/_routes.json：只让 /api/* 走 worker，静态页不经过 worker。
//
// 用法：node worker/scripts/build-worker.mjs（仓库根目录执行；
// npm run build:worker）。注意 astro build 会清空 dist/，所以这一步
// 必须在 npm run build 链的最后执行（package.json 里已排在 pagefind 之后）。
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const WORKER_DIR = join(ROOT, "worker");
const DIST = join(ROOT, "dist");

const sql = readFileSync(join(WORKER_DIR, "migrations", "0001_init.sql"), "utf8");
// 迁移文件里的反引号/反斜杠需要转义才能放进 JS 模板字面量。
const escaped = sql.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
writeFileSync(
  join(WORKER_DIR, "src", "migration-sql.js"),
  `// 由 worker/scripts/build-worker.mjs 从 migrations/0001_init.sql 自动生成，请勿手改。\nexport const MIGRATION_SQL = \`${escaped}\`;\n`,
);
console.log("migration-sql.js: regenerated from 0001_init.sql");

if (!existsSync(DIST)) {
  console.error("dist/ 不存在：请先跑 npm run build（astro build）再打包 worker。");
  process.exit(1);
}

const esbuild = join(ROOT, "node_modules", ".bin", "esbuild");
if (!existsSync(esbuild)) {
  console.error("esbuild 未找到（node_modules/.bin/esbuild）：它是 astro 的传递依赖，");
  console.error("如果被清理，请先跑 npm install 恢复。");
  process.exit(1);
}
execFileSync(
  esbuild,
  [
    join(WORKER_DIR, "src", "index.js"),
    "--bundle",
    "--format=esm",
    "--platform=browser",
    "--target=es2022",
    "--minify",
    `--outfile=${join(DIST, "_worker.js")}`,
  ],
  { stdio: "inherit" },
);
console.log(`dist/_worker.js: built`);

writeFileSync(
  join(DIST, "_routes.json"),
  JSON.stringify({ version: 1, include: ["/api/*"], exclude: [] }, null, 2) + "\n",
);
console.log("dist/_routes.json: written (include /api/* only)");
