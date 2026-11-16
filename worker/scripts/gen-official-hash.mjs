// 生成官方账号（official@aglaia.design）的强随机密码与 PBKDF2 哈希，
// 并把哈希写进 worker/src/db.js 的 OFFICIAL_PASSWORD_HASH 常量。
//
//   node worker/scripts/gen-official-hash.mjs
//
// 安全：
// - 明文密码只打印到 stdout 一次，由操作者抄走后妥善保管；
//   本脚本不把密码写进任何文件。
// - 哈希生成后脚本会立即用同一份 crypto.js 做 verifyPassword 往返校验，
//   确保汇报出去的密码与入库的哈希确实匹配。
// - 已生成过哈希时拒绝重复运行（避免误覆盖）；确实要轮换时先把常量
//   改回占位符 REPLACE_ME_WITH_GENERATED_HASH 再跑。
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { hashPassword, verifyPassword } from "../src/crypto.js";

const DB_JS = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "db.js");
const PLACEHOLDER = "REPLACE_ME_WITH_GENERATED_HASH";

const src = readFileSync(DB_JS, "utf8");
if (!src.includes(`"${PLACEHOLDER}"`)) {
  console.error("db.js 里已经有哈希常量，拒绝重复生成。需要轮换请先恢复占位符。");
  process.exit(1);
}

// 24 个 base64url 字符 ≈ 144 bit 熵。
const password = randomBytes(18).toString("base64url");
const hash = await hashPassword(password);
const ok = await verifyPassword(password, hash);
if (!ok) {
  console.error("往返校验失败：生成的哈希无法验证该密码，未写入。");
  process.exit(1);
}

writeFileSync(DB_JS, src.replace(`"${PLACEHOLDER}"`, `"${hash}"`));
console.log("OFFICIAL_PASSWORD_HASH 已写入 worker/src/db.js，往返校验通过。");
console.log("");
console.log("官方账号：official@aglaia.design（昵称：阿格莱亚，role=official）");
console.log("明文密码（只显示这一次，请立即抄走妥善保管，不要写进文件）：");
console.log(password);
