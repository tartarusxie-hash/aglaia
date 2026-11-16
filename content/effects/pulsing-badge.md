---
id: "pulsing-badge"
kind: "effect"
type: "effect"
name_zh: "呼吸徽标"
name_en: "Pulsing Badge"
summary_zh: "小圆点一圈圈向外扩散波纹，专表「正在进行」"
description: "A dot ripples outward in rings — the universal 'live right now' signal"
keywords: ["pulsing badge","effect","css","pulsing-badge"]
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
preview_code: "src/lib/effects-data.mjs#pulsing-badge"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

一个实心圆点，加一个伪元素圆环：圆环从 0.5 倍放大到 1.3 倍的同时淡出，循环播放就是波纹。Tailwind 的 animate-ping 就是现成实现。它只适合真正的实时状态（直播、录制中、定位中），滥用会变成视觉噪音。

## How it works (English)

A solid dot plus a pseudo-element ring: the ring scales from 0.5× to 1.3× while fading out, looped. Tailwind's animate-ping is this exact effect built in. Reserve it for genuinely live states (streaming, recording, locating) — overuse turns it into visual noise.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
