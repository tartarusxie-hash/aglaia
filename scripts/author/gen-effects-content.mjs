// 生成 content/effects/*.md（30）与 content/prompts/fx-*.md（30，七段式，schema §7）
// 数据：src/lib/effects-data.mjs（参数/代码）+ scripts/author/effects-prose.mjs（双语文案）
import { writeFileSync, mkdirSync} from "node:fs";
import { INTERACTIVE_EFFECTS, STATIC_EFFECTS, effectDefaults} from "../../src/lib/effects-data.mjs";
import { EFFECT_PROSE} from "./effects-prose.mjs";
import { S, FLOW, licenseLines, verificationLines, fmFile, CODE_LICENSE, SELF_LICENSE} from "./yaml.mjs";

const PH = (t) => "\u3010" + t + "\u3011"; // ——运行时拼，避免字面量被工具链吞
const CB = "- " + String.fromCharCode(91, 32, 93) + " "; // checkbox

function schemaParams(sliderParams) {
return (sliderParams || []).map((p) => ({
name: "{{" + p.name + "}}",
type: p.type,
default: String(p.default),
range: p.kind === "range"? String(p.min) + "–" + String(p.max): (p.options || []).join(" / "),
unit: p.unit || "",
}));
}

function writeEffect(id, interactive) {
const p = EFFECT_PROSE[id];
if (!p) throw new Error("missing prose " + id);
const def = interactive? INTERACTIVE_EFFECTS[id]: null;
const lines = [
"id: " + S(id),
"kind: " + S("effect"),
"type: " + S("effect"),
"name_zh: " + S(p.zh.name),
"name_en: " + S(p.en.name),
"summary_zh: " + S(p.zh.desc),
"description: " + S(p.en.desc),
"keywords: " + FLOW([p.en.name.toLowerCase(), "effect", "css", id]),
"platforms: " + FLOW(["all"]),
"function: " + S("motion"),
"placements: " + FLOW(["content-area"]),
"granularity: " + S("effect"),
"status: " + S("published"),
...licenseLines(CODE_LICENSE),
"preview_code: " + S("src/lib/effects-data.mjs#" + id),
"code_targets: " + FLOW(["html-css", "tailwind", "react"]),
"applies_to: " + FLOW([]),
"parameters: " + FLOW(schemaParams(def?.params)),
"slider_params: " + FLOW(def?.params || []),
"interactive: " + (interactive? "true": "false"),
"created: " + S("2026-11-10"),
"updated: " + S("2026-11-10"),
];
const body = "## 它是怎么工作的（中文）\n\n" + p.zh.how + "\n\n## How it works (English)\n\n" + p.en.how + "\n\n## 参考与来源 Sources\n\n本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。\n";
writeFileSync("content/effects/" + id + ".md", fmFile(lines, body));
}

function writePrompt(id, interactive) {
const p = EFFECT_PROSE[id];
const def = interactive? INTERACTIVE_EFFECTS[id]: null;
const params = schemaParams(def?.params);
const paramRows = params.length
? params.map((x) => "| " + x.name + " | " + x.type + " | " + x.default + " | " + (x.range || "—") + " |").join("\n")
: "| （无） | — | — | 本效果没有可调参数，按效果页代码原样实现 |";
const body = [
"## 角色 Role",
"",
"你是一名资深前端工程师，擅长用最少的代码实现精致的界面效果。只用 CSS 与 Web Animations API，不引第三方动画库。",
"",
"## 任务 Task",
"",
"实现一个「" + p.zh.name + "」效果：" + p.zh.desc + "。它将用在 " + PH("页面/组件位置，如：定价卡、首屏背景、加载占位") + "，出现条件为 " + PH("默认呈现 / 悬停时 / 加载中，三选一") + "。不适配的场景先向我说明，不要硬套。",
"",
"## 效果描述 Description",
"",
p.zh.how,
"",
"## 设计 Tokens",
"",
"颜色只用本站中性灰阶令牌（或替换为我的品牌色变量）：{{token:color/ink/primary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；动效时长与曲线 {{token:motion/duration/normal}}、{{token:motion/easing/ease-out-expo}}。本效果参数：",
"",
"| 参数 | 类型 | 默认 | 范围 |",
"|---|---|---|---|",
paramRows,
"",
"## 约束 Constraints",
"",
"- 动画只用 transform / opacity / filter，不引发布局抖动；",
"- 尊重 prefers-reduced-motion：用户要求减少动态时改为静态呈现；",
"- 悬停类效果同时支持键盘聚焦触发；纯装饰层加 aria-hidden；",
"- 静态默认态必须正确：动效默认静止，悬停才播放（本站页面效果卡片规则）。",
"",
"## 框架目标 Target",
"",
PH("html-css / tailwind / react，三选一，默认 html-css"),
"",
"## 输出格式 Output",
"",
"输出完整可运行代码（单文件或组件），并逐项对照验收：",
"",
CB + "参数与上表一致，改参数能看出变化；",
CB + "静态默认态正确，悬停播放、移开复位；",
CB + "prefers-reduced-motion 下不播放动效；",
CB + "移动端（无悬停）有可用呈现或降级。",
"",
"（验证状态：待复验。本条提示词尚未经真实模型实测，验证字段如实留空。）",
].join("\n");
const lines = [
"id: " + S("fx-" + id),
"kind: " + S("prompt"),
"type: " + S("prompt"),
"name_zh: " + S(p.zh.name + " · 提示词"),
"name_en: " + S(p.en.name + " Prompt"),
"summary_zh: " + S("生成「" + p.zh.name + "」效果的填空式提示词"),
"description: " + S("Fill-in prompt that generates the " + p.en.name + " effect"),
"keywords: " + FLOW(["prompt", "effect", id]),
"platforms: " + FLOW(["all"]),
"function: " + S("motion"),
"placements: " + FLOW(["content-area"]),
"granularity: " + S("component"),
"status: " + S("stale"),
...licenseLines(SELF_LICENSE),
"level: " + S("component"),
"effect: " + S(id),
"version: " + S("1.0.0"),
"targets: " + FLOW(["html-css", "tailwind", "react"]),
"parameters: " + FLOW(params),
...verificationLines(),
"created: " + S("2026-11-10"),
"updated: " + S("2026-11-10"),
];
writeFileSync("content/prompts/fx-" + id + ".md", fmFile(lines, body));
}

mkdirSync("content/effects", { recursive: true});
mkdirSync("content/prompts", { recursive: true});
let n = 0;
for (const id of Object.keys(INTERACTIVE_EFFECTS)) { writeEffect(id, true); writePrompt(id, true); n++;}
for (const s of STATIC_EFFECTS) { writeEffect(s.id, false); writePrompt(s.id, false); n++;}
console.log("effects + fx prompts written:", n, "+", n);
