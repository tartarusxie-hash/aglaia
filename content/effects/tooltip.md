---
id: "tooltip"
kind: "effect"
type: "effect"
name_zh: "气泡提示"
name_en: "Tooltip"
summary_zh: "悬停或聚焦时在元素上方浮出一句小字解释"
description: "A small caption floats above an element on hover or focus"
keywords: ["tooltip","effect","css","tooltip"]
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
preview_code: "src/lib/effects-data.mjs#tooltip"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

一个相对定位的触发元素 + 绝对定位的小气泡，默认 opacity 0，:hover 和 :focus 时淡入并微微上移，再加一个小三角指向触发点。三个规矩：提示里不放必须点的东西、不放长文本、移动端点按要有替代（很多场景干脆把解释写进正文）。

## How it works (English)

A relatively-positioned trigger plus an absolutely-positioned bubble: opacity 0 by default, fading in with a slight rise on :hover and :focus, with a small triangle pointing back. Three rules: nothing clickable inside, no long text, and on touch devices provide an alternative — often the explanation belongs in the body copy anyway.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
