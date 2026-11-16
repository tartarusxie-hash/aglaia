---
id: "spotlight-card"
kind: "effect"
type: "effect"
name_zh: "聚光灯卡片"
name_en: "Spotlight Card"
summary_zh: "一团光跟着鼠标在卡片上走，照到哪亮到哪"
description: "A pool of light follows the cursor across the card"
keywords: ["spotlight card","effect","css","spotlight-card"]
platforms: ["all"]
function: "motion"
placements: ["content-area"]
granularity: "effect"
status: "published"
license:
  spdx: "MIT"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
preview_code: "src/lib/effects-data.mjs#spotlight-card"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{glow-size}}","type":"length","default":"300","range":"150–520","unit":"px"},{"name":"{{glow-opacity}}","type":"percent","default":"0.25","range":"0.05–0.5","unit":""},{"name":"{{radius}}","type":"length","default":"14","range":"6–28","unit":"px"}]
slider_params: [{"name":"glow-size","label_zh":"光晕大小","label_en":"Glow size","type":"length","kind":"range","min":150,"max":520,"step":10,"default":"300","unit":"px"},{"name":"glow-opacity","label_zh":"光晕强度","label_en":"Glow opacity","type":"percent","kind":"range","min":0.05,"max":0.5,"step":0.05,"default":"0.25","unit":""},{"name":"radius","label_zh":"圆角","label_en":"Radius","type":"length","kind":"range","min":6,"max":28,"step":1,"default":"14","unit":"px"}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

卡片上盖一层径向渐变光斑，JS 把鼠标坐标写进两个 CSS 变量（--mx / --my），渐变中心跟着变量走。光斑用 `pointer-events: none` 不挡点击。用 requestAnimationFrame 或直接写变量都行，关键是别在 mousemove 里做重排。

## How it works (English)

A radial-gradient layer sits over the card; JS writes the cursor coordinates into two CSS variables (--mx / --my) and the gradient center follows. The layer uses `pointer-events: none` so it never blocks clicks. Keep the mousemove handler free of layout work.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
