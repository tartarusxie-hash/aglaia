---
id: "dot-grid-bg"
kind: "effect"
type: "effect"
name_zh: "点阵背景"
name_en: "Dot Grid Background"
summary_zh: "等距小圆点铺满背景，像方格纸一样的隐形坐标系"
description: "Evenly spaced dots tile the background — graph paper for the eye"
keywords: ["dot grid background","effect","css","dot-grid-bg"]
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
preview_code: "src/lib/effects-data.mjs#dot-grid-bg"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

一行 radial-gradient 就能画：一个小圆点 + 透明，background-size 决定间距，平铺即成。点阵的妙处是「有秩序但不抢戏」，设计工具和开发者向产品特别爱用它。点的颜色比背景深一档就够，别更深。

## How it works (English)

One radial-gradient does it: a small dot plus transparency, tiled at a background-size interval. Dot grids feel ordered without stealing attention, which is why design tools and dev products love them. Make dots just one shade darker than the background — no more.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
