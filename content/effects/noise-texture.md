---
id: "noise-texture"
kind: "effect"
type: "effect"
name_zh: "噪点质感"
name_en: "Noise Texture"
summary_zh: "给大色块盖一层极细的噪点，去掉「塑料感」"
description: "A whisper of grain over flat color kills the plastic look"
keywords: ["noise texture","effect","css","noise-texture"]
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
preview_code: "src/lib/effects-data.mjs#noise-texture"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

用 SVG 的 feTurbulence 滤镜生成一张噪点图，透明度压到 0.1 上下平铺在背景上。大脑会把这层颗粒读成「材质」，扁平色立刻有了纸感。噪点太粗或太浓会显脏——slope（强度）宁小勿大，而且它应该是若有似无的那一层。

## How it works (English)

Generate a noise tile with SVG's feTurbulence filter, keep its alpha around 0.1, and tile it over the background. The brain reads grain as material, so flat color suddenly feels like paper. Too coarse or too strong looks dirty — keep the intensity low; the layer should be barely there.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
