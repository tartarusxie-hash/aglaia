// 内容加载器：内容文件（content/ 与 guides/ 下的 Markdown + YAML frontmatter）是全站唯一数据源。
// frontmatter 解析器与 scripts/build-registry.mjs 同一子集：标量（JSON 编码）、单行流式 JSON 数组/对象、一层嵌套对象。
import { marked } from "marked";

export interface License {
  spdx: string;
  author: string;
  source_url: string;
  verified: boolean;
}
export interface Verification {
  last_verified_model: string;
  last_verified_date: string;
  verified_by: string;
  result: string;
}
export interface Param {
  name: string;
  type: string;
  default: string;
  range?: string;
  unit?: string;
  label_zh?: string;
  label_en?: string;
  options?: string[];
}
export interface Item {
  id: string;
  kind: string;
  type?: string;
  name_zh: string;
  name_en: string;
  summary_zh: string;
  summary_en?: string;
  description: string;
  keywords: string[];
  status: string;
  license: License;
  created?: string;
  updated?: string;
  // taxonomy
  platforms?: string[];
  function?: string;
  function_secondary?: string[];
  placements?: string[];
  granularity?: string;
  // pattern
  function_group?: string;
  definition_zh?: string;
  definition_en?: string;
  misconceptions_zh?: string;
  misconceptions_en?: string;
  // entry
  pattern?: string;
  patterns_secondary?: string[];
  prompts?: string[];
  effects?: string[];
  resources?: string[];
  // prompt
  level?: string;
  entry?: string;
  effect?: string;
  version?: string;
  targets?: string[];
  parameters?: Param[];
  verification?: Verification;
  // scene
  refs?: { prompt: string; version: string; overrides?: Record<string, string> }[];
  entries?: string[];
  layout_zh?: string;
  layout_en?: string;
  // effect
  preview_code?: string;
  code_targets?: string[];
  applies_to?: string[];
  interactive?: boolean;
  // resource
  url?: string;
  usage?: string;
  reference_only?: boolean;
  patterns?: string[];
  fee_note_zh?: string;
  // guide
  discipline?: string;
  guide_type?: string;
  group?: string;
  related?: string[];
  bodyMd: string;
  html: string;
  path: string;
}

function parseValue(raw: string): unknown {
  const t = raw.trim();
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}
function parseFrontmatter(text: string): { fm: Record<string, unknown>; body: string } | null {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return null;
  const data: Record<string, unknown> = {};
  let parent: string | null = null;
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    if (/^\s/.test(line) && parent) {
      const mm = line.trim().match(/^([^:]+):\s*(.*)$/);
      if (mm) (data[parent] as Record<string, unknown>)[mm[1].trim()] = parseValue(mm[2]);
      continue;
    }
    const mm = line.match(/^([^:]+):\s*(.*)$/);
    if (!mm) continue;
    const key = mm[1].trim();
    if (mm[2].trim() === "") {
      data[key] = {};
      parent = key;
    } else {
      data[key] = parseValue(mm[2]);
      parent = null;
    }
  }
  return { fm: data, body: text.slice(m[0].length) };
}

const rawFiles: Record<string, string> = {
  ...(import.meta.glob("/content/**/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>),
  ...(import.meta.glob("/guides/**/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>),
};

export const allItems: Item[] = Object.entries(rawFiles)
  .map(([path, text]) => {
    const parsed = parseFrontmatter(text);
    if (!parsed || !parsed.fm.id) return null;
    const bodyMd = parsed.body.trim();
    return {
      ...(parsed.fm as unknown as Item),
      bodyMd,
      html: marked.parse(bodyMd) as string,
      path,
    } as Item;
  })
  .filter((x): x is Item => x !== null)
  .sort((a, b) => a.id.localeCompare(b.id));

export const byId = new Map(allItems.map((i) => [i.id, i]));
export const get = (id: string) => byId.get(id);
export const ofKind = (kind: string) => allItems.filter((i) => i.kind === kind);
export const published = (items: Item[]) => items.filter((i) => i.status === "published");

export const patterns = published(ofKind("pattern"));
export const entries = published(ofKind("entry"));
// prompt 含 stale（待复验）：schema 规定未验证不得 published，但站点如实标注展示
const live = (items: Item[]) => items.filter((i) => i.status === "published" || i.status === "stale");
export const prompts = live(ofKind("prompt"));
export const scenes = live(ofKind("scene"));
export const effects = published(ofKind("effect"));
export const resources = published(ofKind("resource"));
export const guides = published(ofKind("guide"));
export const disciplines = guides.filter((g) => g.guide_type === "discipline");
export const principles = guides.filter((g) => g.guide_type === "principle");
export const labs = guides.filter((g) => g.guide_type === "lab");
export const checklist = guides.find((g) => g.guide_type === "checklist");

export const promptOfEntry = (entryId: string) =>
  prompts.filter((p) => p.level === "component" && p.entry === entryId);
export const entriesOfPattern = (patternId: string) => entries.filter((e) => e.pattern === patternId);
export const effectPrompt = (effectId: string) => prompts.find((p) => p.effect === effectId);
