---
id: "marquee"
kind: "effect"
type: "effect"
name_zh: "无缝跑马灯"
name_en: "Seamless Marquee"
summary_zh: "一排内容匀速横滚，首尾相接看不出断点"
description: "A row of content scrolls forever with no visible seam"
keywords: ["seamless marquee","effect","css","marquee"]
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
preview_code: "src/lib/effects-data.mjs#marquee"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{duration}}","type":"length","default":"18","range":"5–40","unit":"s"},{"name":"{{gap}}","type":"length","default":"32","range":"8–64","unit":"px"},{"name":"{{direction}}","type":"enum","default":"left","range":"left / right","unit":""}]
slider_params: [{"name":"duration","label_zh":"一圈时长","label_en":"Duration","type":"length","kind":"range","min":5,"max":40,"step":1,"default":"18","unit":"s"},{"name":"gap","label_zh":"条目间距","label_en":"Gap","type":"length","kind":"range","min":8,"max":64,"step":2,"default":"32","unit":"px"},{"name":"direction","label_zh":"方向","label_en":"Direction","type":"enum","kind":"select","options":["left","right"],"default":"left","label_options":{"left":"向左","right":"向右"}}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

秘诀是内容复制两份并排，轨道动画平移 -50% 后瞬间归位——因为后半段和前半段长得一模一样，跳回去也看不出来。速度用「每份内容的宽度 ÷ 期望时长」算，别写死。鼠标悬停暂停是基本礼貌；重要信息不要只放在跑马灯里。

## How it works (English)

Duplicate the content twice side by side, animate the track to -50%, then snap back — the second half looks identical to the first, so the jump is invisible. Compute duration from one copy's width instead of hardcoding it. Pause on hover is basic courtesy, and never put critical information only in a marquee.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
