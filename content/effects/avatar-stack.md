---
id: "avatar-stack"
kind: "effect"
type: "effect"
name_zh: "头像堆叠"
name_en: "Avatar Stack"
summary_zh: "一排头像互相压住一部分，一眼看出「很多人参与」"
description: "Avatars overlap in a row — instant 'lots of people here' signal"
keywords: ["avatar stack","effect","css","avatar-stack"]
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
preview_code: "src/lib/effects-data.mjs#avatar-stack"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

每个头像负 margin 向左压住前一个，再用一圈与背景同色的描边把重叠处「切」开。最后一个位置留给「+N」计数。悬停时让单个头像上浮，能顺手解决「压在一起看不清」的问题。头像记得给 alt 或 aria-label，别让屏幕阅读器只读出一堆图片。

## How it works (English)

Each avatar uses a negative left margin to tuck under the previous one, and a border in the background color 'cuts' the overlap cleanly. The last slot is a '+N' count. Lifting an avatar on hover helps when faces get crowded. Give avatars alt text or aria-labels so screen readers don't just announce a pile of images.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
