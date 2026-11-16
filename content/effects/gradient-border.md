---
id: "gradient-border"
kind: "effect"
type: "effect"
name_zh: "流光边框"
name_en: "Gradient Border"
summary_zh: "一圈渐变光沿着边框缓慢旋转，专为重点内容准备"
description: "A ring of gradient light slowly orbits the border — reserved for hero content"
keywords: ["gradient border","effect","css","gradient-border"]
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
preview_code: "src/lib/effects-data.mjs#gradient-border"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{speed}}","type":"length","default":"5","range":"2–12","unit":"s"},{"name":"{{border-width}}","type":"length","default":"2","range":"1–6","unit":"px"},{"name":"{{radius}}","type":"length","default":"16","range":"6–30","unit":"px"}]
slider_params: [{"name":"speed","label_zh":"流光速度","label_en":"Speed","type":"length","kind":"range","min":2,"max":12,"step":0.5,"default":"5","unit":"s"},{"name":"border-width","label_zh":"边框宽度","label_en":"Border width","type":"length","kind":"range","min":1,"max":6,"step":1,"default":"2","unit":"px"},{"name":"radius","label_zh":"圆角","label_en":"Radius","type":"length","kind":"range","min":6,"max":30,"step":1,"default":"16","unit":"px"}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

用 conic-gradient 画一个旋转的锥形渐变，再用 mask 把中间镂空只剩边框一圈。旋转靠 @property 注册的 --a 角度变量做动画（现代浏览器支持）。不支持 @property 的浏览器会看到一圈静态渐变边框——优雅降级，不算坏。

## How it works (English)

Draw a rotating conic-gradient, then mask out the middle so only a border ring remains. Rotation animates a @property-registered angle variable --a (supported in modern browsers). Browsers without @property see a static gradient border — graceful degradation, not breakage.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
