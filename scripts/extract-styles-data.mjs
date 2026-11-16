// 从 src/pages/styles/*.astro 提取 39 篇艺术风格的共享数据，生成 src/lib/styles-data.mjs。
// 轮播与风格库索引页共用同一份数据；分类按调研报告的五章，顺序按报告内顺序。
// 用法：node scripts/extract-styles-data.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/pages/styles");

// 分类：调研报告五章（report.md），顺序即报告内顺序。
const ORDER = [
  // 19世纪末 · 20世纪初
  ["early", ["impressionism", "post-impressionism", "arts-and-crafts", "art-nouveau", "fauvism", "expressionism"]],
  // 20世纪上半叶
  ["modern", ["cubism", "futurism", "dadaism", "surrealism", "suprematism", "constructivism", "de-stijl", "bauhaus", "wiener-werkstatte", "art-deco"]],
  // 20世纪中后期
  ["postwar", ["abstract-expressionism", "pop-art", "minimalism", "op-art", "photorealism", "swiss-style", "brutalism", "postmodernism", "memphis", "punk-diy", "grunge"]],
  // 数字时代
  ["digital", ["skeuomorphism", "flat-design", "neumorphism", "material-design", "glassmorphism", "claymorphism", "y2k", "frutiger-aero"]],
  // 非西方美学
  ["east", ["ukiyo-e", "wabi-sabi", "mingei", "chinese-landscape"]],
];

const field = (src, name) => {
  const m = src.match(new RegExp(`${name}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"));
  if (!m) return null;
  return m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
};

const styles = [];
const missing = [];
for (const [cat, ids] of ORDER) {
  for (const id of ids) {
    let src;
    try {
      src = readFileSync(join(dir, `${id}.astro`), "utf8");
    } catch {
      missing.push(id);
      continue;
    }
    const nameZh = field(src, "nameZh");
    const nameEn = field(src, "nameEn");
    const years = field(src, "years");
    const origin = field(src, "origin");
    const definition = field(src, "definition");
    const heroTone = field(src, "heroTone") || "dark";
    if (!nameZh || !nameEn || !definition) {
      missing.push(`${id}（字段不全）`);
      continue;
    }
    styles.push({ id, category: cat, nameZh, nameEn, years, origin, definition, heroTone });
  }
}

// 检查：styles 目录下有没有 ORDER 之外的页面文件。
const onDisk = readdirSync(dir).filter((f) => f.endsWith(".astro")).map((f) => f.replace(/\.astro$/, ""));
const inOrder = new Set(ORDER.flatMap(([, ids]) => ids));
const extra = onDisk.filter((id) => !inOrder.has(id));
if (extra.length) missing.push(`目录多出：${extra.join("、")}`);

const out = `// 39 艺术风格共享数据：资源库轮播 + /styles/ 索引页共用。
// 由 scripts/extract-styles-data.mjs 从 src/pages/styles/*.astro 提取生成；
// 分类按艺术流派调研报告的五章，顺序按报告内顺序。改数据请改源页面文件后重跑脚本。
export const STYLE_CATEGORIES = [
  { key: "all", zh: "总览", en: "All" },
  { key: "early", zh: "19世纪末 · 20世纪初", en: "Late 19th – Early 20th Century" },
  { key: "modern", zh: "20世纪上半叶", en: "First Half of the 20th Century" },
  { key: "postwar", zh: "20世纪中后期", en: "Mid-to-Late 20th Century" },
  { key: "digital", zh: "数字时代", en: "Digital Era" },
  { key: "east", zh: "非西方美学", en: "Beyond the West" },
];

export const STYLES = ${JSON.stringify(styles, null, 2)};
`;

writeFileSync(join(root, "src/lib/styles-data.mjs"), out);
console.log(`styles: ${styles.length}`);
console.log(missing.length ? `MISSING: ${missing.join("; ")}` : "all 39 extracted, no missing");
