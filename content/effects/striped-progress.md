---
id: "striped-progress"
kind: "effect"
type: "effect"
name_zh: "条纹进度条"
name_en: "Striped Progress"
summary_zh: "斜条纹在填充段里持续流动，一看就知道「还在干活」"
description: "Diagonal stripes keep flowing inside the fill — 'still working' at a glance"
keywords: ["striped progress","effect","css","striped-progress"]
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
preview_code: "src/lib/effects-data.mjs#striped-progress"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

填充段的背景是 repeating-linear-gradient 的 45° 斜纹，动画只动 background-position，条纹就像传送带一样走起来。它和普通进度条的分工：确定进度用平滑填充，不确定或想强调「进行中」时上条纹。条纹流动方向要和进度增长方向一致，反了会很别扭。

## How it works (English)

The fill's background is a 45° repeating-linear-gradient; animating background-position makes the stripes run like a conveyor. Division of labor: smooth fills for determinate progress, stripes for indeterminate or 'actively processing' states. Stripe flow must match the fill's growth direction — reversed looks wrong immediately.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
