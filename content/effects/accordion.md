---
id: "accordion"
kind: "effect"
type: "effect"
name_zh: "手风琴折叠"
name_en: "Accordion"
summary_zh: "问答一条条收起，点标题展开答案——原生 details 零 JS"
description: "Q&A rows collapse and expand — native details, zero JS"
keywords: ["accordion","effect","css","accordion"]
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
preview_code: "src/lib/effects-data.mjs#accordion"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

HTML 自带 details/summary 元素：点击展开、自带键盘可达、零 JavaScript。要做的只有样式：去掉默认小三角，换成一个会旋转 45° 变成 × 的加号。需要「同时只开一个」时给 details 加同一个 name 属性（现代浏览器支持）。

## How it works (English)

HTML's details/summary elements expand on click, are keyboard-accessible, and need no JavaScript. Styling is all that's left: remove the default marker and use a plus that rotates 45° into an ×. For 'only one open at a time', give the details elements the same name attribute (modern browsers support it).

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
