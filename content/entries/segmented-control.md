---
id: "segmented-control"
kind: "entry"
type: "component"
name_zh: "分段控制 / 标签页"
name_en: "Segmented Control & Tabs"
summary_zh: "同屏切换内容分组的小控件：像药丸的是分段控制，带下划线的是标签页。"
description: "A compact control for switching content groups in place: pill-shaped segmented control, or tabs with an underline."
keywords: ["segmented control tabs","component","navigation"]
platforms: ["all"]
function: "navigation"
placements: ["content-area","top-nav"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "tabs-segmented"
prompts: ["segmented-control-prompt"]
effects: ["sliding-tabs"]
resources: ["shadcn-ui","mui","ant-design"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

分段控制把 2–5 个互斥的视图或筛选钉在一个小控件里，点哪段看哪段，不用跳页。药丸式适合筛选与视图切换，下划线标签页适合内容分区，常配一条会滑动的墨条指示当前段。

## 什么时候用

同页内容有 2–5 个明确分组、且切换频繁时用它，比下拉快、比跳页轻。

## 什么时候不用

分组超过 5 个（用标签页加滚动或下拉）、或分组之间没有关系（那是导航问题）时别用。

## 细节与变体

- 每段文字长度尽量接近，太长的一段会把控件撑变形
- 当前段必须同时有颜色和字重变化，不能只靠一条下划线（色盲用户看不见）
- 切换时内容区高度跳变会晃页面，能预留高度就预留

配套效果见下方「可用效果」。
