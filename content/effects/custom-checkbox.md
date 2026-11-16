---
id: "custom-checkbox"
kind: "effect"
type: "effect"
name_zh: "自定义多选框"
name_en: "Custom Checkbox"
summary_zh: "藏起原生方框，换一个圆角方形 + 勾的自有样式"
description: "Hide the native box, show your own rounded square + check"
keywords: ["custom checkbox","effect","css","custom-checkbox"]
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
preview_code: "src/lib/effects-data.mjs#custom-checkbox"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

套路是「真 input 隐身 + 假方框替身」：label 包住 sr-only 的 input 和一个 span 方框，用 :checked + 相邻选择器给方框上色打勾。关键是别把 input 用 display:none 删掉——键盘焦点和表单语义都靠它，焦点样式画在替身 span 上。

## How it works (English)

The pattern is 'real input goes invisible, fake box performs': a label wraps an sr-only input and a span box; :checked with the sibling selector fills the box and shows the check. Never display:none the input — keyboard focus and form semantics depend on it; draw the focus style on the stand-in span.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
