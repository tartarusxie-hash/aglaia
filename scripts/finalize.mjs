// 构建收尾：astro build + build-registry 之后运行。
// 从 dist/registry.json / registry-ext.json 生成 dist/llms.txt 与 dist/search-index.json。
import { readFileSync, writeFileSync } from "node:fs";

const registry = JSON.parse(readFileSync("dist/registry.json", "utf8"));
const ext = JSON.parse(readFileSync("dist/registry-ext.json", "utf8"));
const BASE = "https://aglaia.design";

function pathOf(it) {
  const fm = ext[it.name] || {};
  switch (it.kind) {
    case "entry": return `/components/entries/${it.name}`;
    case "pattern": return `/components/patterns/${it.name}`;
    case "prompt": case "scene": return `/prompts/${it.name}`;
    case "effect": return `/effects/${it.name}`;
    case "resource": return `/resources`;
    case "guide":
      if (fm.guide_type === "discipline") return `/learn/disciplines/${it.name}`;
      if (fm.guide_type === "lab") return `/learn/lab/${it.name}`;
      if (fm.guide_type === "checklist") return `/learn/checklist`;
      return `/learn/principles`;
    case "token-set": return `/tokens`;
    default: return `/`;
  }
}

const items = registry.items.filter((i) => i.status === "published" || i.status === "stale");

// ---- search-index.json（关键词索引：名字/别名/标签，补 Pagefind 中文分词之不足）----
const kw = items.map((it) => {
  const fm = ext[it.name] || {};
  return {
    id: it.name,
    kind: it.kind,
    name_zh: it.title_zh || it.title || it.name,
    name_en: it.title || it.name,
    summary_zh: it.summary_zh || "",
    description: it.description || "",
    keywords: [...(it.keywords || []), ...(fm.aliases || []), fm.function || "", fm.function_group || ""].filter(Boolean),
    path: pathOf(it),
  };
});
writeFileSync("dist/search-index.json", JSON.stringify(kw, null, 1) + "\n");

// ---- llms.txt ----
const groups = [
  ["Patterns 模式", "pattern"],
  ["Components 组件", "entry"],
  ["Prompts 提示词（组件级）", "prompt"],
  ["Scenes 场景提示词", "scene"],
  ["Effects 效果", "effect"],
  ["Learn 学习指南", "guide"],
  ["Resources 外部资源", "resource"],
  ["Tokens 令牌", "token-set"],
];
let out = `# Aglaia 阿格莱亚

> Aglaia is a free, open-source design resource site for the AI era: standard names for every UI building block (bilingual zh/en), fill-in prompt flows that make AI generate components and pages, live effect sandboxes, design principles and hands-on instruments, and a license-labelled index of open-source resources. Content CC BY 4.0, code MIT. No paid features.

Machine registry (shadcn-compatible): ${BASE}/registry.json · extended fields: ${BASE}/registry-ext.json

`;
for (const [title, kind] of groups) {
  const list = items.filter((i) => i.kind === kind);
  if (!list.length) continue;
  out += `## ${title}\n\n`;
  for (const it of list) {
    const fm = ext[it.name] || {};
    const desc = (it.summary_zh || it.description || "").replace(/\s+/g, " ").slice(0, 120);
    out += `- [${it.title_zh || it.title || it.name}](${BASE}${pathOf(it)}): ${desc}\n`;
  }
  out += "\n";
}
writeFileSync("dist/llms.txt", out);
console.log("finalize: search-index", kw.length, "items; llms.txt", out.length, "chars");
