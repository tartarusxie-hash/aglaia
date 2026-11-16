---
id: "mesh-gradient"
kind: "effect"
type: "effect"
name_zh: "网格渐变背景"
name_en: "Mesh Gradient"
summary_zh: "几团柔光色块互相交融，缓慢漂移的高级感背景"
description: "Soft blobs of color melt into each other and drift slowly — a premium background"
keywords: ["mesh gradient","effect","css","mesh-gradient"]
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
preview_code: "src/lib/effects-data.mjs#mesh-gradient"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{speed}}","type":"length","default":"16","range":"6–30","unit":"s"},{"name":"{{softness}}","type":"length","default":"42","range":"20–80","unit":"px"},{"name":"{{tone}}","type":"enum","default":"gray","range":"gray / warm / cool","unit":""}]
slider_params: [{"name":"speed","label_zh":"漂移速度","label_en":"Drift speed","type":"length","kind":"range","min":6,"max":30,"step":1,"default":"16","unit":"s"},{"name":"softness","label_zh":"柔和程度","label_en":"Softness (blur)","type":"length","kind":"range","min":20,"max":80,"step":2,"default":"42","unit":"px"},{"name":"tone","label_zh":"色调","label_en":"Tone","type":"enum","kind":"select","options":["gray","warm","cool"],"default":"gray","label_options":{"gray":"纯灰阶","warm":"暖灰","cool":"冷灰"}}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

几团大色块各自定位、加一个大 blur 滤镜，边缘就融化在一起了；再让每团以不同速度微微漂移，背景就像活的一样。性能提示：blur 半径越大越吃 GPU，漂移用 transform 实现，别动 left/top。本站版本只用灰阶演示，换品牌色时记得压暗饱和度。

## How it works (English)

Position several large color blobs, give each a heavy blur filter, and their edges melt together; drift each at a different speed with transform and the background feels alive. Performance note: large blur radii are GPU-hungry; animate transform only, never left/top. This site's demo stays grayscale — if you swap in brand colors, keep saturation low.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
