---
id: "glassmorphism"
kind: "effect"
type: "effect"
name_zh: "毛玻璃拟态"
name_en: "Glassmorphism"
summary_zh: "半透明面板 + 背景模糊，像一块磨砂玻璃浮在画面上"
description: "A translucent panel with backdrop blur — frosted glass floating over the scene"
keywords: ["glassmorphism","effect","css","glassmorphism"]
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
preview_code: "src/lib/effects-data.mjs#glassmorphism"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{blur}}","type":"length","default":"14","range":"0–30","unit":"px"},{"name":"{{opacity}}","type":"percent","default":"0.22","range":"0.04–0.6","unit":""},{"name":"{{radius}}","type":"length","default":"20","range":"0–36","unit":"px"},{"name":"{{border-opacity}}","type":"percent","default":"0.5","range":"0–0.9","unit":""}]
slider_params: [{"name":"blur","label_zh":"模糊半径","label_en":"Blur","type":"length","kind":"range","min":0,"max":30,"step":1,"default":"14","unit":"px"},{"name":"opacity","label_zh":"底色不透明度","label_en":"Tint opacity","type":"percent","kind":"range","min":0.04,"max":0.6,"step":0.02,"default":"0.22","unit":""},{"name":"radius","label_zh":"圆角","label_en":"Radius","type":"length","kind":"range","min":0,"max":36,"step":1,"default":"20","unit":"px"},{"name":"border-opacity","label_zh":"描边亮度","label_en":"Border brightness","type":"percent","kind":"range","min":0,"max":0.9,"step":0.05,"default":"0.5","unit":""}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

核心就一句 CSS：`backdrop-filter: blur()` 把面板背后的画面实时磨糊，再叠一层半透明白压出玻璃的亮边。模糊半径决定「磨砂程度」，透明度决定「玻璃厚度」。注意两点：背景必须有内容可糊（纯色背景上看不出效果）；低端安卓机上大面积 backdrop-filter 会掉帧，面积要克制。

## How it works (English)

One CSS line does the work: `backdrop-filter: blur()` frosts whatever sits behind the panel in real time, and a translucent white fill adds the glassy sheen. Blur radius sets the frost level; opacity sets the glass thickness. Two caveats: the background needs actual content to frost (a flat color shows nothing), and large backdrop-filter areas can drop frames on low-end Android — keep the area modest.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
