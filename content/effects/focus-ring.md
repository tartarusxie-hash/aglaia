---
id: "focus-ring"
kind: "effect"
type: "effect"
name_zh: "焦点环"
name_en: "Focus Ring"
summary_zh: "键盘 Tab 走到哪，哪里亮起一圈描边——无障碍的底线"
description: "Wherever Tab lands, a ring lights up — the accessibility baseline"
keywords: ["focus ring","effect","css","focus-ring"]
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
preview_code: "src/lib/effects-data.mjs#focus-ring"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

秘诀在 :focus-visible：浏览器只在键盘（等非指针）操作时匹配它，鼠标点击不出现。做法是先 :focus { outline: none } 去掉默认，再给 :focus-visible 画一圈 2–3px 的描边 + 2–3px 偏移。颜色要在任何背景上都看得见；深色 UI 里记得换浅色环。这条效果删了 outline 又不补环，就是亲手把键盘用户关在门外。

## How it works (English)

The trick is :focus-visible: browsers match it for keyboard (non-pointer) interaction only, not mouse clicks. Remove the default with :focus { outline: none }, then draw a 2–3px outline plus 2–3px offset on :focus-visible. The color must read on any background — swap to a light ring in dark UIs. Removing outlines without restoring a ring locks keyboard users out.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
