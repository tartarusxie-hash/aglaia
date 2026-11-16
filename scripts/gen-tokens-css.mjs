// Aglaia 站点令牌 → CSS 变量生成脚本
// 读 tokens/tokens.json（W3C DTCG），解析 {引用}，输出 src/styles/tokens.css。
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(ROOT, "tokens/tokens.json"), "utf8"));

function flatten(obj, prefix, out) {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    const path = prefix ? `${prefix}-${k}` : k;
    if (v && typeof v === "object" && "$value" in v) out[path] = { value: v.$value, type: v.$type };
    else if (v && typeof v === "object") flatten(v, path, out);
  }
  return out;
}
const flat = flatten(tokens, "", {});
function resolve(val, seen = new Set()) {
  if (typeof val === "string") {
    const m = val.match(/^\{(.+)\}$/);
    if (m) {
      const key = m[1].replace(/\./g, "-");
      if (seen.has(key)) throw new Error("token ref cycle: " + key);
      seen.add(key);
      return resolve(flat[key].value, seen);
    }
    return val;
  }
  if (Array.isArray(val)) return val.join(", ");
  if (val && typeof val === "object" && "value" in val && "unit" in val) return `${val.value}${val.unit}`;
  return String(val);
}

function cssVars(filterPrefix, rename) {
  const lines = [];
  for (const [key, t] of Object.entries(flat)) {
    if (!key.startsWith(filterPrefix)) continue;
    const name = rename(key.slice(filterPrefix.length));
    let v = resolve(t.value);
    if (t.type === "cubicBezier" && Array.isArray(t.value)) v = `cubic-bezier(${t.value.join(", ")})`;
    if (t.type === "fontFamily" && Array.isArray(t.value)) v = t.value.map((f) => (f.includes(" ") ? `"${f}"` : f)).join(", ");
    lines.push(`  --${name}: ${v};`);
  }
  return lines.join("\n");
}

const light = cssVars("color-", (k) => `color-${k}`);
const dark = cssVars("colorDark-", (k) => `color-${k}`);
const rest = [
  ...Object.entries(flat)
    .filter(([k]) => !k.startsWith("color-") && !k.startsWith("colorDark-"))
    .map(([key, t]) => {
      let v = resolve(t.value);
      if (t.type === "cubicBezier" && Array.isArray(t.value)) v = `cubic-bezier(${t.value.join(", ")})`;
      if (t.type === "fontFamily" && Array.isArray(t.value)) v = t.value.map((f) => (f.includes(" ") ? `"${f}"` : f)).join(", ");
      return `  --${key}: ${v};`;
    }),
].join("\n");

const css = `/* 由 scripts/gen-tokens-css.mjs 从 tokens/tokens.json 生成，请勿手改。 */
:root {
${light}
${rest}
}
@media (prefers-color-scheme: dark) {
  :root {
${dark}
  }
}
`;
mkdirSync(join(ROOT, "src/styles"), { recursive: true });
writeFileSync(join(ROOT, "src/styles/tokens.css"), css);
console.log("tokens.css generated:", css.split("\n").length, "lines");
