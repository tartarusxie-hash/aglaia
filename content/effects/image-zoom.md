---
id: "image-zoom"
kind: "effect"
type: "effect"
name_zh: "图片悬停放大"
name_en: "Image Hover Zoom"
summary_zh: "鼠标放上图片，画面在框里慢慢推近"
description: "Hover an image and the scene slowly pushes in, inside its frame"
keywords: ["image hover zoom","effect","css","image-zoom"]
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
preview_code: "src/lib/effects-data.mjs#image-zoom"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

外层框 overflow: hidden 裁住，内层图片 hover 时 scale 到 1.1 左右，配一个 0.5 秒级的 ease-out 过渡，就是「推近镜头」的感觉。放大幅度别超过 1.2，图片分辨率要留余量，不然放大后糊给你看。触屏没有 hover，这个效果在移动端自动缺席——别把关键信息藏在放大里。

## How it works (English)

The outer frame clips with overflow: hidden; the inner image scales to ~1.1 on hover with a ~0.5s ease-out transition — that reads as a camera push-in. Don't exceed ~1.2×, and keep resolution headroom or the zoom reveals blur. Touch has no hover, so this effect is absent on mobile — never hide key information inside the zoom.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
