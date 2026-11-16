---
id: "neumorphism"
kind: "effect"
type: "effect"
name_zh: "新拟态"
name_en: "Neumorphism"
summary_zh: "元素像从背景里「挤」出来一样，一道亮影一道暗影塑造体积"
description: "Elements look extruded from the background — one light shadow, one dark shadow"
keywords: ["neumorphism","effect","css","neumorphism"]
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
preview_code: "src/lib/effects-data.mjs#neumorphism"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{distance}}","type":"length","default":"6","range":"2–14","unit":"px"},{"name":"{{blur}}","type":"length","default":"12","range":"4–30","unit":"px"},{"name":"{{intensity}}","type":"percent","default":"0.16","range":"0.05–0.32","unit":""},{"name":"{{radius}}","type":"length","default":"16","range":"4–40","unit":"px"}]
slider_params: [{"name":"distance","label_zh":"阴影距离","label_en":"Shadow distance","type":"length","kind":"range","min":2,"max":14,"step":1,"default":"6","unit":"px"},{"name":"blur","label_zh":"阴影模糊","label_en":"Shadow blur","type":"length","kind":"range","min":4,"max":30,"step":1,"default":"12","unit":"px"},{"name":"intensity","label_zh":"阴影强度","label_en":"Intensity","type":"percent","kind":"range","min":0.05,"max":0.32,"step":0.01,"default":"0.16","unit":""},{"name":"radius","label_zh":"圆角","label_en":"Radius","type":"length","kind":"range","min":4,"max":40,"step":1,"default":"16","unit":"px"}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

新拟态不画边框：同一块背景色上，同时投一道向左上的白色高光影和一道向右下的深色影，眼睛就读出了「凸起」。按下去时把外影换成内影（inset），就像真的被压进材料里。代价是对比度天然偏低——文字和关键状态不能只靠它区分，无障碍上要另加手段。

## How it works (English)

Neumorphism draws no borders: on the same background color, a white highlight shadow up-left plus a darker shadow down-right makes the eye read volume. Pressed states swap outer shadows for inset ones, as if pushed into the material. The cost is inherently low contrast — never let text or critical states rely on it alone; add another accessibility cue.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
