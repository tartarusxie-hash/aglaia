---
id: "animated-counter"
kind: "effect"
type: "effect"
name_zh: "数字滚动计数"
name_en: "Animated Counter"
summary_zh: "数字从 0 滚到目标值，先快后慢稳稳停住"
description: "Numbers roll from 0 to the target, fast then slow, landing softly"
keywords: ["animated counter","effect","css","animated-counter"]
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
preview_code: "src/lib/effects-data.mjs#animated-counter"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{target}}","type":"length","default":"12800","range":"100–99999","unit":""},{"name":"{{duration}}","type":"length","default":"1600","range":"400–3000","unit":"ms"},{"name":"{{easing}}","type":"enum","default":"out","range":"out / inout","unit":""}]
slider_params: [{"name":"target","label_zh":"目标数字","label_en":"Target","type":"length","kind":"range","min":100,"max":99999,"step":100,"default":"12800","unit":""},{"name":"duration","label_zh":"滚动时长","label_en":"Duration","type":"length","kind":"range","min":400,"max":3000,"step":100,"default":"1600","unit":"ms"},{"name":"easing","label_zh":"缓动","label_en":"Easing","type":"enum","kind":"select","options":["out","inout"],"default":"out","label_options":{"out":"先快后慢","inout":"慢快慢"}}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

用 requestAnimationFrame 按进度取缓动值，把「已过时间 ÷ 总时长」喂给 easeOutCubic 再乘目标值。数字字体记得开 tabular-nums（等宽数字），否则滚动时整行会左右抖。计数只用在「数字本身是主角」的统计场景，别给每个小数字都加。

## How it works (English)

Drive it with requestAnimationFrame: feed elapsed/duration through easeOutCubic and multiply by the target. Turn on tabular-nums (monospaced figures) or the line will jitter as digits change width. Reserve counters for stats where the number is the hero — not every small figure deserves one.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
