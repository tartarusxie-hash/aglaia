---
id: "sliding-tabs"
kind: "effect"
type: "effect"
name_zh: "滑动标签页"
name_en: "Sliding Tabs"
summary_zh: "标签下的一条墨线滑到当前标签，像墨水在流动"
description: "An ink bar under the tabs glides to the active one"
keywords: ["sliding tabs","effect","css","sliding-tabs"]
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
preview_code: "src/lib/effects-data.mjs#sliding-tabs"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

墨线是绝对定位的小条，切换时 JS 量一下目标标签的 offsetLeft 和 offsetWidth 写给它，CSS 过渡负责「滑」。字体加载会改变文字宽度，记得在字体就绪和窗口 resize 时重新量一次。用 transform 的版本性能更好，但量位置这件事躲不掉。

## How it works (English)

The ink bar is an absolutely-positioned strip; on switch, JS measures the target tab's offsetLeft and offsetWidth and writes them over, while a CSS transition does the gliding. Font loading changes text widths — re-measure on font readiness and window resize. A transform-based version performs better, but measuring is unavoidable either way.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
