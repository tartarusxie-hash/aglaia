---
id: "tilt-card"
kind: "effect"
type: "effect"
name_zh: "3D 倾斜卡片"
name_en: "3D Tilt Card"
summary_zh: "卡片随鼠标方向微微倾斜，像拿在手里的一张实体卡"
description: "The card tilts toward the cursor, like a physical card in your hand"
keywords: ["3d tilt card","effect","css","tilt-card"]
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
preview_code: "src/lib/effects-data.mjs#tilt-card"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{max-tilt}}","type":"length","default":"10","range":"2–20","unit":"deg"},{"name":"{{scale}}","type":"percent","default":"1.03","range":"1–1.1","unit":""},{"name":"{{glare}}","type":"enum","default":"on","range":"on / off","unit":""}]
slider_params: [{"name":"max-tilt","label_zh":"最大倾斜角","label_en":"Max tilt","type":"length","kind":"range","min":2,"max":20,"step":1,"default":"10","unit":"deg"},{"name":"scale","label_zh":"悬停放大","label_en":"Hover scale","type":"percent","kind":"range","min":1,"max":1.1,"step":0.01,"default":"1.03","unit":""},{"name":"glare","label_zh":"高光","label_en":"Glare","type":"enum","kind":"select","options":["on","off"],"default":"on","label_options":{"on":"开","off":"关"}}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

把鼠标在卡片内的相对位置换算成 rotateX / rotateY 角度（一般不超过 10 度），父级给 `perspective` 才有纵深。离开时把角度归零并让 CSS 过渡慢慢回正。倾斜角度一大就廉价且晕——克制是这个效果的全部手艺。

## How it works (English)

Convert the cursor's relative position inside the card into rotateX / rotateY angles (keep them under ~10 degrees); the parent needs `perspective` for depth. On leave, reset the angles and let a CSS transition ease it back. Big angles look cheap and cause motion sickness — restraint is the whole craft here.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
