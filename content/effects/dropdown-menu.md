---
id: "dropdown-menu"
kind: "effect"
type: "effect"
name_zh: "下拉菜单"
name_en: "Dropdown Menu"
summary_zh: "点开一列操作项，带分组分隔线和滑入动画"
description: "A panel of actions opens with grouping separators and a slide-in"
keywords: ["dropdown menu","effect","css","dropdown-menu"]
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
preview_code: "src/lib/effects-data.mjs#dropdown-menu"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: []
slider_params: []
interactive: false
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

触发按钮 + 绝对定位的菜单面板，打开时从 opacity 0 + 下移 5px 过渡进来。菜单项 hover 给浅底色，组与组之间用 1px 分隔线。生产代码要处理：点外部关闭、Esc 关闭、方向键导航、焦点回收——手写很容易漏，建议用 Radix 这类无样式原语打底。

## How it works (English)

A trigger button plus an absolutely-positioned panel that transitions from opacity 0 + 5px down. Items get a soft hover background; groups split with a 1px separator. Production menus must handle outside-click close, Esc, arrow-key navigation, and focus return — easy to miss by hand, so build on an unstyled primitive like Radix.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
