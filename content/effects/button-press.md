---
id: "button-press"
kind: "effect"
type: "effect"
name_zh: "按钮按压感"
name_en: "Button Press Feel"
summary_zh: ":active 时按钮沉下去 3 像素，底影同步变薄"
description: "On :active the button sinks 3px and its bottom shadow thins with it"
keywords: ["button press feel","effect","css","button-press"]
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
preview_code: "src/lib/effects-data.mjs#button-press"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

给按钮一条 4px 的实底边阴影装作「厚度」，:active 时 translateY 沉 3px、阴影收到 1px——眼睛立刻读成「按进去了」。要点是快：过渡 100ms 量级，拖泥带水就假了。没有实体厚度的扁平按钮，则用 scale(.97) 的微缩替代。

## How it works (English)

Give the button a 4px solid bottom shadow as fake 'thickness'; on :active, translateY down 3px and shrink the shadow to 1px — the eye instantly reads 'pressed in'. Speed is the point: transitions around 100ms; sluggish feels fake. For flat buttons without thickness, a scale(.97) micro-shrink is the substitute.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
