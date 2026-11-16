// 一次性生成 src/pages/** 路由薄封装（zh 根 + /en 镜像）
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const STATIC = [
  ["index.astro", "Home", ""],
  ["components/index.astro", "ComponentsIndex", ""],
  ["prompts/index.astro", "PromptsIndex", ""],
  ["effects/index.astro", "EffectsIndex", ""],
  ["learn/index.astro", "LearnIndex", ""],
  ["learn/principles.astro", "GuidePage", ` mode="principles"`],
  ["learn/lab/index.astro", "LabIndex", ""],
  ["learn/checklist.astro", "GuidePage", ` mode="checklist" item={checklist}`, `import { checklist } from "LIB/content";`],
  ["resources.astro", "ResourcesPage", ""],
  ["library.astro", "LibraryPage", ""],
  ["skills.astro", "SkillsPage", ""],
  ["contact.astro", "ContactPage", ""],
  ["workbench.astro", "WorkbenchPage", ""],
  ["about.astro", "AboutPage", ""],
  ["search.astro", "SearchPage", ""],
  ["tokens.astro", "TokensPage", ""],
];
const DYNAMIC = [
  ["components/patterns/[id].astro", "PatternPage", "patterns"],
  ["components/entries/[id].astro", "EntryPage", "entries"],
  ["prompts/[id].astro", "PromptPage", "promptsAll"],
  ["effects/[id].astro", "EffectPage", "effects"],
  ["learn/disciplines/[id].astro", "GuidePage", "disciplines", ` mode="discipline"`],
  ["learn/lab/[id].astro", "LabPage", "labs"],
];

let DEPTH_BONUS = 0;
function rel(file, target) {
  const depth = file.split("/").length - 1; // 目录层数（相对 pages 根）
  return "../".repeat(depth + 1 + DEPTH_BONUS) + target;
}

for (const lang of ["zh", "en"]) {
  DEPTH_BONUS = lang === "en" ? 1 : 0;
  const root = lang === "en" ? "src/pages/en" : "src/pages";
  for (const [file, view, extraProps, extraImport] of STATIC) {
    const V = rel(file, `views/${view}.astro`);
    const imp = extraImport ? "\n" + extraImport.replace("LIB", rel(file, "lib")) : "";
    const body = `---\nimport ${view} from "${V}";${imp}\n---\n<${view} lang="${lang}"${extraProps || ""} />\n`;
    mkdirSync(dirname(root + "/" + file), { recursive: true });
    writeFileSync(root + "/" + file, body);
  }
  for (const [file, view, coll, extraProps] of DYNAMIC) {
    const V = rel(file, `views/${view}.astro`);
    const L = rel(file, "lib/content");
    const collExpr = coll === "promptsAll" ? "[...prompts, ...scenes]" : coll;
    const collImport = coll === "promptsAll" ? "prompts, scenes" : coll;
    const body = `---\nimport ${view} from "${V}";\nimport { ${collImport} } from "${L}";\nexport function getStaticPaths() {\n  return ${collExpr}.map((item) => ({ params: { id: item.id }, props: { item } }));\n}\nconst { item } = Astro.props;\n---\n<${view} lang="${lang}" item={item}${extraProps || ""} />\n`;
    mkdirSync(dirname(root + "/" + file), { recursive: true });
    writeFileSync(root + "/" + file, body);
  }
}
// 404（双语合一页）
writeFileSync("src/pages/404.astro", `---\nimport Base from "../layouts/Base.astro";\n---\n<Base lang="zh" title="404 · 这一页不存在">\n  <div class="mx-auto max-w-6xl px-4 sm:px-6 pt-20 text-center">\n    <div class="font-mono text-7xl font-bold">404</div>\n    <p class="mt-4 text-lg text-ink2">这一页搬走了，或者从来没有存在过。</p>\n    <p class="mt-1 text-muted">This page has moved, or never existed.</p>\n    <p class="mt-8 flex justify-center gap-3">\n      <a href="/" class="rounded-md bg-primary px-5 py-2.5 font-semibold text-onprimary">回首页</a>\n      <a href="/search" class="rounded-md border border-linestrong px-5 py-2.5">去搜索</a>\n    </p>\n  </div>\n</Base>\n`);
console.log("routes generated");
