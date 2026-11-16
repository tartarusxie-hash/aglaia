#!/usr/bin/env node
// Aglaia registry 构建脚本
// 扫描 content/ 与 guides/ 下的条目文件（Markdown + YAML frontmatter），生成：
//   dist/registry.json      —— shadcn registry 兼容形状（索引）
//   dist/registry-ext.json  —— 扩展字段旁挂（prompt/参数/验证/行为等，按条目 ID 索引）
//   dist/items/<id>.json    —— 逐条 item 文件（{name}.json 部署形态的基础）
// frontmatter 由项目自产，解析器只支持本仓库使用的子集：标量（JSON 编码）、单行数组、一层嵌套对象。
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIRS = [
  "content/patterns", "content/entries", "content/prompts", "content/scenes",
  "content/effects", "content/resources",
  "guides/disciplines", "guides/principles", "guides/lab",
];
const EXTRA_FILES = ["guides/checklist.md"];

function parseValue(raw) {
  const t = raw.trim();
  try { return JSON.parse(t); } catch { return t; }
}
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return null;
  const data = {};
  let parent = null;
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    if (/^\s/.test(line) && parent) {
      const mm = line.trim().match(/^([^:]+):\s*(.*)$/);
      if (mm) data[parent][mm[1].trim()] = parseValue(mm[2]);
      continue;
    }
    const mm = line.match(/^([^:]+):\s*(.*)$/);
    if (!mm) continue;
    const key = mm[1].trim();
    if (mm[2].trim() === "") { data[key] = {}; parent = key; }
    else { data[key] = parseValue(mm[2]); parent = null; }
  }
  return data;
}

const KIND_TO_REGISTRY_TYPE = {
  entry: "registry:component",
  effect: "registry:component",
  pattern: "registry:file",
  prompt: "registry:file",
  scene: "registry:file",
  resource: "registry:file",
  guide: "registry:file",
};

const files = [];
for (const d of CONTENT_DIRS) {
  let names = [];
  try { names = readdirSync(join(ROOT, d)).filter((f) => f.endsWith(".md")); } catch { continue; }
  for (const n of names) files.push(join(d, n));
}
files.push(...EXTRA_FILES);
files.sort();

const items = [];
const ext = {};
const seen = new Set();
for (const rel of files) {
  const fm = parseFrontmatter(readFileSync(join(ROOT, rel), "utf8"));
  if (!fm || !fm.id) { console.error("SKIP (no frontmatter/id):", rel); continue; }
  if (seen.has(fm.id)) { console.error("DUPLICATE ID:", fm.id); process.exitCode = 1; continue; }
  seen.add(fm.id);
  const item = {
    name: fm.id,
    type: KIND_TO_REGISTRY_TYPE[fm.kind] || "registry:file",
    title: fm.name_en,
    description: fm.description || "",
    keywords: fm.keywords || [],
    title_zh: fm.name_zh,
    summary_zh: fm.summary_zh,
    kind: fm.kind,
    entry_type: fm.type,
    platforms: fm.platforms,
    function: fm.function,
    placements: fm.placements,
    granularity: fm.granularity,
    status: fm.status,
    license: fm.license,
    file: rel,
  };
  items.push(item);
  ext[fm.id] = { ...fm };
}

// TokenSet 作为 registry:theme 条目登记
const tokensItem = {
  name: "aglaia-tokens",
  type: "registry:theme",
  title: "Aglaia Design Tokens",
  description: "Aglaia site design tokens (W3C DTCG): black/white/gray palette with off-white base, type scale, spacing, radius, motion.",
  keywords: ["tokens", "dtcg", "theme"],
  kind: "token-set",
  status: "published",
  file: "tokens/tokens.json",
};
items.push(tokensItem);
ext["aglaia-tokens"] = { id: "aglaia-tokens", kind: "token-set", file: "tokens/tokens.json" };

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "aglaia",
  homepage: "https://aglaia.design",
  items,
};

mkdirSync(join(ROOT, "dist/items"), { recursive: true });
rmSync(join(ROOT, "dist/items"), { recursive: true, force: true });
mkdirSync(join(ROOT, "dist/items"), { recursive: true });
for (const it of items) {
  writeFileSync(join(ROOT, "dist/items", `${it.name}.json`), JSON.stringify(it, null, 2) + "\n");
}
writeFileSync(join(ROOT, "dist/registry.json"), JSON.stringify(registry, null, 2) + "\n");
writeFileSync(join(ROOT, "dist/registry-ext.json"), JSON.stringify(ext, null, 2) + "\n");

const byKind = {};
for (const it of items) byKind[it.kind] = (byKind[it.kind] || 0) + 1;
console.log(`registry.json: ${items.length} items`, byKind);
