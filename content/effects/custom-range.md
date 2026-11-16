---
id: "custom-range"
kind: "effect"
type: "effect"
name_zh: "自定义滑杆"
name_en: "Custom Range Slider"
summary_zh: "给原生 range 换上品牌样式：填充轨道 + 圆形滑块"
description: "Restyle the native range input: filled track + round thumb"
keywords: ["custom range slider","effect","css","custom-range"]
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
preview_code: "src/lib/effects-data.mjs#custom-range"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

原生 input[type=range] 能用但难看。WebKit 要写 ::-webkit-slider-thumb 和轨道伪元素，填充进度靠一个 CSS 变量或 range-progress（Firefox）。滑块热区至少 24px——看得见的部分可以小，点得中的范围不能小，这是费茨定律的现场应用。

## How it works (English)

Native input[type=range] works but looks dated. WebKit needs ::-webkit-slider-thumb and track pseudo-elements; the filled portion comes from a CSS variable (or Firefox's range-progress). Keep the hit area at least 24px — the visible thumb can be small, the tappable area cannot. Fitts's Law, applied.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
