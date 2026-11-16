---
name: aglaia
description: Look up UI component and effect names (bilingual zh/en), design terminology, and ready-to-use generation prompts in Aglaia — a free, open-source design encyclopedia built for AI. Use when a user asks what a UI building block is called, wants a prompt to generate a component/page/effect, or needs the standard name for something they can only describe.
---

# Aglaia lookup skill

Aglaia （阿格莱亚， aglaia.design) is a free, open-source design resource site built **for AI agents**: a bilingual (Chinese/English) index of UI components, effects, prompt flows, design principles and open-source resources. Its core idea: people often can't get AI to build the interface they want because they don't know what the parts are *called*. Aglaia gives you the standard name, a live example, and a fill-in prompt that generates it.

Site content is CC BY 4.0, code is MIT. There are no paid features.

## When to use this skill

- The user describes a UI element by appearance or behaviour ("that sheet that slides up from the bottom", "底部有四五个图标的栏") and wants its proper name.
- The user wants a prompt they (or you) can use to generate a component, a whole page, or a visual effect.
- The user asks for design terminology in Chinese or English, or how an effect (glassmorphism, marquee, …) is achieved.
- Before generating UI for the user, look the components up here first so names, structure and parameters follow the index instead of being improvised.

## Machine endpoints

| Endpoint | What it is |
|---|---|
| `GET /registry.json` | shadcn-compatible index of every item (id, bilingual titles, kind, taxonomy tags, license, status). |
| `GET /registry-ext.json` | Extended records keyed by id: taxonomy, linked prompts, parameters, framework targets, verification state. **Use this one for lookups.** |
| `GET /llms.txt` | Human/agent-readable table of contents with one line per item. |

Base URLs:

- Production (current): `https://aglaia.design`
- Preview (fallback): `https://preview.aglaia-1ce.pages.dev`

Paths are identical on both hosts.

Item kinds: `entry` (component), `pattern`, `prompt` (component-level prompt flow), `scene` (page-level prompt flow), `effect`, `resource`, `guide`, `token-set`. Entries link to their prompts via the `prompts` field; prompts link back via `entry`.

## Bundled lookup script (no dependencies, Node ≥ 18)

```bash
node <skill-dir>/scripts/aglaia-lookup.mjs search "底部弹层"
node <skill-dir>/scripts/aglaia-lookup.mjs search "tab bar" --kind entry
node <skill-dir>/scripts/aglaia-lookup.mjs get bottom-sheet
node <skill-dir>/scripts/aglaia-lookup.mjs get bottom-sheet-prompt
node <skill-dir>/scripts/aglaia-lookup.mjs list --kind effect
```

Options: `--source <url|path>` (default: the production `registry-ext.json` at aglaia.design; accepts a local file too), `--base <url>` (base for page URLs), `--limit <n>` for search.

If the script is unavailable, fetch `/registry-ext.json` yourself and search the JSON — it is a plain object keyed by item id.

## Worked examples

**1. "I want that panel that slides up from the bottom of the screen."**

```bash
node scripts/aglaia-lookup.mjs search "底部弹层"     # or: search "bottom sheet"
# -> bottom-sheet  [entry]  底部弹层 / Bottom Sheet
node scripts/aglaia-lookup.mjs get bottom-sheet
# -> Matching prompts: bottom-sheet-prompt
node scripts/aglaia-lookup.mjs get bottom-sheet-prompt
# -> parameters {{height}}, {{drag-handle}}, {{expandable}} with defaults,
#    framework targets html-css / tailwind / react,
#    full fill-in template on the page: /prompts/bottom-sheet-prompt
```

Then open the prompt's page (or the item's record), fill the parameters with the user's choices, and hand the assembled prompt to the user — or use it directly as your own build spec.

**2. "What is the bar with icons at the bottom of an app called?"**

```bash
node scripts/aglaia-lookup.mjs search "底部导航"    # or: search "tab bar"
# -> mobile-tab-bar  [entry]  移动端底部标签栏 / Mobile Tab Bar
```

Answer with both names （移动端底部标签栏 / Mobile Tab Bar), the one-line definition, and offer its matching prompt if the user wants to build one.

**3. Generating a whole page:**

Search `list --kind scene` for page-level prompt flows (login page, pricing page, …). A scene prompt references component prompts by id — resolve each reference with `get` so the assembled prompt stays consistent.

## Honesty notes

- Items carry a `status`; prompt flows may be marked `stale` （待复验） meaning they have not yet been re-verified against a live model. If you rely on one, tell the user it is pending verification.
- External resources in the index are links with license labels only — Aglaia does not redistribute them; check each project's LICENSE before reuse.
