---
id: "steps-indicator"
kind: "effect"
type: "effect"
name_zh: "步骤指示器"
name_en: "Steps Indicator"
summary_zh: "圆点 + 连线画出流程进度：已完成打勾，当前步高亮"
description: "Dots and connectors show flow progress: done gets a check, current gets the highlight"
keywords: ["steps indicator","effect","css","steps-indicator"]
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
preview_code: "src/lib/effects-data.mjs#steps-indicator"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

结构是「圆点—连线—圆点」交替排列。三种状态必须一眼可分：完成（实心 + 对勾）、当前（描边高亮）、未到（灰）。连线跟随前一步的状态变色。步骤超过 5 个时，移动端建议改成「第 2 步 / 共 5 步 + 进度条」的紧凑形态。

## How it works (English)

The structure alternates dot—line—dot. Three states must read at a glance: done (filled + check), current (outlined highlight), upcoming (gray). Connectors take the color of the step before them. Beyond ~5 steps, switch mobile to a compact 'Step 2 of 5 + progress bar' form.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
