---
id: "card-lift"
kind: "effect"
type: "effect"
name_zh: "卡片悬停上浮"
name_en: "Card Hover Lift"
summary_zh: "鼠标一放上去，卡片抬起几像素、影子变深"
description: "Hover raises the card a few pixels and deepens its shadow"
keywords: ["card hover lift","effect","css","card-lift"]
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
preview_code: "src/lib/effects-data.mjs#card-lift"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

三件套一起动：translateY 上抬 4–6px、box-shadow 变大变柔、边框颜色加深一档，过渡 300ms 左右。它在用物理世界的隐喻说话——「被拿起来的东西就是可以拿的」。整页都是可点卡片时会失效，因为没有「没被拿起」的对照了。

## How it works (English)

Three things move together: translateY up 4–6px, a larger softer box-shadow, and a one-step darker border, over ~300ms. It speaks in physical metaphor — 'the thing being picked up is the thing you can take'. If every card on the page lifts, the signal dies: there's no resting state to contrast with.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
