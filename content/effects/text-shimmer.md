---
id: "text-shimmer"
kind: "effect"
type: "effect"
name_zh: "文字微光"
name_en: "Text Shimmer"
summary_zh: "一道亮光扫过文字本身，常见于「AI 正在生成」的提示"
description: "A band of light sweeps across the text itself — the 'AI is generating' cue"
keywords: ["text shimmer","effect","css","text-shimmer"]
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
preview_code: "src/lib/effects-data.mjs#text-shimmer"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

还是 background-clip: text 那套：一段三站渐变（暗—亮—暗）铺在文字上，background-size 放大到 220%，动画滚动 background-position，亮带就扫过去了。它是「状态文字」的效果，别用在标题或正文上——会读不清，也显得廉价。

## How it works (English)

Same background-clip: text trick: a three-stop gradient (dim—bright—dim) sized to 220%, with background-position animated so the bright band sweeps through. It's a status-text effect — never for headings or body copy, where it hurts readability and looks cheap.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
