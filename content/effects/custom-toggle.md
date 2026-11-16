---
id: "custom-toggle"
kind: "effect"
type: "effect"
name_zh: "自定义开关"
name_en: "Custom Toggle"
summary_zh: "轨道 + 滑块的开关，滑块滑过去就是「开」"
description: "A track and a thumb — slide means on"
keywords: ["custom toggle","effect","css","custom-toggle"]
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
preview_code: "src/lib/effects-data.mjs#custom-toggle"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

本质是一个 role="switch" 的按钮：轨道是圆角长条，滑块是绝对定位的小圆，开状态时 left 从一头变到另一头配过渡。用 aria-checked 表达状态，屏幕阅读器才能读对。滑块要有阴影才看得出是「浮在轨道上」的可动件。

## How it works (English)

At its core it's a button with role="switch": a pill track, an absolutely-positioned round thumb, and a left transition between ends. Use aria-checked for state so screen readers announce it correctly. A subtle shadow on the thumb sells it as a movable piece floating on the track.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
