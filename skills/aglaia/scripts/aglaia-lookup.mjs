#!/usr/bin/env node
// aglaia-lookup.mjs — dependency-free lookup against the Aglaia registry.
// Works with registry-ext.json (default, richest fields) or registry.json,
// from an https URL or a local file path.
//
// Usage:
//   node aglaia-lookup.mjs search <query> [--kind entry|prompt|scene|effect|pattern|resource|guide] [--limit 10]
//   node aglaia-lookup.mjs get <id>
//   node aglaia-lookup.mjs list [--kind <kind>]
// Options:
//   --source <url|path>   registry JSON to read (default: $AGLAIA_SOURCE or the production registry-ext.json on aglaia.design)
//   --base <url>          site base used to build page URLs (default: derived from --source, else https://aglaia.design)

const args = process.argv.slice(2);
const cmd = args[0];
const rest = args.slice(1);

function opt(name, fallback) {
  const i = rest.indexOf("--" + name);
  return i >= 0 && rest[i + 1] ? rest[i + 1] : fallback;
}
const positional = rest.filter((a, i) => !a.startsWith("--") && !(i > 0 && rest[i - 1].startsWith("--")));

const DEFAULT_SOURCE = "https://aglaia.design/registry-ext.json";
const source = opt("source", process.env.AGLAIA_SOURCE || DEFAULT_SOURCE);
let base = opt("base", "");
if (!base) {
  const m = source.match(/^(https?:\/\/[^/]+)/);
  base = m ? m[1] : "https://aglaia.design";
}

async function load(src) {
  let raw;
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src);
    if (!res.ok) throw new Error(`fetch ${src} -> HTTP ${res.status}`);
    raw = await res.text();
  } else {
    const { readFile } = await import("node:fs/promises");
    raw = await readFile(src, "utf8");
  }
  const data = JSON.parse(raw);
  // Normalize both shapes: registry-ext.json is {id: item}; registry.json is {items: [...]}
  const items = Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : Object.values(data);
  return items.map((it) => ({
    id: it.id || it.name,
    kind: it.kind || "",
    name_zh: it.name_zh || it.title_zh || "",
    name_en: it.name_en || it.title || it.name || "",
    summary_zh: it.summary_zh || "",
    description: it.description || "",
    keywords: it.keywords || [],
    status: it.status || "",
    raw: it,
  }));
}

function pagePath(it) {
  switch (it.kind) {
    case "entry": return `/components/entries/${it.id}`;
    case "pattern": return `/components/patterns/${it.id}`;
    case "prompt": case "scene": return `/prompts/${it.id}`;
    case "effect": return `/effects/${it.id}`;
    case "resource": return `/resources`;
    case "token-set": return `/tokens`;
    default: return `/`;
  }
}

function score(it, q) {
  const ql = q.toLowerCase();
  let s = 0;
  if (it.id.toLowerCase() === ql) s += 100;
  if (it.name_zh.includes(q) || it.name_en.toLowerCase().includes(ql)) s += 40;
  if (it.keywords.some((k) => String(k).toLowerCase().includes(ql) || String(k).includes(q))) s += 20;
  if (it.summary_zh.includes(q) || it.description.toLowerCase().includes(ql)) s += 10;
  if (it.id.toLowerCase().includes(ql)) s += 15;
  return s;
}

function brief(it) {
  return `${it.id}  [${it.kind}]  ${it.name_zh} / ${it.name_en}\n    ${it.summary_zh || it.description}\n    ${base}${pagePath(it)}`;
}

const items = await load(source);

if (cmd === "search") {
  const q = positional[0];
  if (!q) { console.error("usage: search <query>"); process.exit(2); }
  const kind = opt("kind", "");
  const limit = parseInt(opt("limit", "10"), 10);
  const hits = items
    .filter((it) => !kind || it.kind === kind)
    .map((it) => ({ it, s: score(it, q) }))
    .filter((h) => h.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit);
  if (!hits.length) { console.log(`No matches for "${q}".`); process.exit(0); }
  console.log(hits.map((h) => brief(h.it)).join("\n"));
} else if (cmd === "get") {
  const id = positional[0];
  if (!id) { console.error("usage: get <id>"); process.exit(2); }
  const it = items.find((x) => x.id === id);
  if (!it) { console.error(`No item with id "${id}". Try: search ${id}`); process.exit(1); }
  console.log(`${it.name_zh} / ${it.name_en}  [${it.kind}]  status=${it.status}`);
  console.log(`Page: ${base}${pagePath(it)}`);
  const r = it.raw;
  if (r.platforms) console.log(`Platforms: ${r.platforms.join(", ")}`);
  if (r.function) console.log(`Function: ${r.function}`);
  if (Array.isArray(r.prompts) && r.prompts.length) {
    console.log(`Matching prompts: ${r.prompts.join(", ")}  (run: get <prompt-id>)`);
  }
  if (r.entry) console.log(`For component: ${r.entry}  (run: get ${r.entry})`);
  if (Array.isArray(r.targets)) console.log(`Framework targets: ${r.targets.join(", ")}`);
  if (Array.isArray(r.parameters) && r.parameters.length) {
    console.log("Parameters (fill these in the prompt template on the page above):");
    for (const p of r.parameters) console.log(`  ${p.name}  default: ${p.default}${p.range ? `  options: ${p.range}` : ""}`);
  }
  if (r.verification && !r.verification.last_verified_date) {
    console.log("Note: this prompt is marked 待复验 (not yet verified against a live model).");
  }
  console.log("\nFull record:");
  console.log(JSON.stringify(r, null, 1));
} else if (cmd === "list") {
  const kind = opt("kind", "");
  const sel = items.filter((it) => !kind || it.kind === kind);
  console.log(sel.map((it) => `${it.id}\t${it.kind}\t${it.name_zh} / ${it.name_en}`).join("\n"));
  console.error(`(${sel.length} items)`);
} else {
  console.error("Commands: search <query> | get <id> | list   (see header of this file)");
  process.exit(2);
}
