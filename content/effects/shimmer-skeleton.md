---
id: "shimmer-skeleton"
kind: "effect"
type: "effect"
name_zh: "骨架屏微光"
name_en: "Shimmer Skeleton"
summary_zh: "数据没到之前，用灰块占位，一道微光循环扫过"
description: "Gray blocks hold the layout while data loads, swept by a passing sheen"
keywords: ["shimmer skeleton","effect","css","shimmer-skeleton"]
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
preview_code: "src/lib/effects-data.mjs#shimmer-skeleton"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{speed}}","type":"length","default":"1.6","range":"0.8–3","unit":"s"},{"name":"{{sheen-width}}","type":"percent","default":"40","range":"20–80","unit":"%"},{"name":"{{radius}}","type":"length","default":"8","range":"0–16","unit":"px"}]
slider_params: [{"name":"speed","label_zh":"微光速度","label_en":"Shimmer speed","type":"length","kind":"range","min":0.8,"max":3,"step":0.1,"default":"1.6","unit":"s"},{"name":"sheen-width","label_zh":"微光宽度","label_en":"Sheen width","type":"percent","kind":"range","min":20,"max":80,"step":5,"default":"40","unit":"%"},{"name":"radius","label_zh":"骨架圆角","label_en":"Radius","type":"length","kind":"range","min":0,"max":16,"step":1,"default":"8","unit":"px"}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

骨架块就是和真实内容同尺寸的灰色圆角块；微光是一条斜向的白色渐变伪元素，从左扫到右无限循环。骨架的价值在布局稳定：内容到了不跳版。它只适合「结构已知、内容未知」的加载，超过 1 秒还没数据就该考虑空状态或错误提示了。

## How it works (English)

Skeleton blocks are gray rounded rectangles sized exactly like the real content; the sheen is a diagonal white-gradient pseudo-element sweeping left to right forever. The value is layout stability — no jump when content lands. It only suits 'structure known, content unknown' loading; past ~1s, think empty or error states instead.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
