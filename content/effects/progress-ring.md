---
id: "progress-ring"
kind: "effect"
type: "effect"
name_zh: "环形进度"
name_en: "Progress Ring"
summary_zh: "一圈 SVG 弧线画出完成度，中心放百分比"
description: "An SVG arc draws completion around a centered percentage"
keywords: ["progress ring","effect","css","progress-ring"]
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
preview_code: "src/lib/effects-data.mjs#progress-ring"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

SVG 圆的周长是 2πr，用 stroke-dasharray 把整圈分成「一段实线 + 空缺」，调 dashoffset 就能控制画出多少。动画时让 offset 从满值动到目标值即可。圆角端点（stroke-linecap: round）会让弧线显得柔和，是细节分。

## How it works (English)

An SVG circle's circumference is 2πr; stroke-dasharray splits it into dash + gap, and stroke-dashoffset controls how much is drawn. Animate the offset from full to target. Rounded line caps soften the arc ends — a small detail that reads as polish.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
