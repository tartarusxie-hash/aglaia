---
id: "mobile-tab-bar"
kind: "entry"
type: "component"
name_zh: "底部标签栏（移动端）"
name_en: "Bottom Tab Bar (Mobile)"
summary_zh: "App 底部那排一级入口：图标在上、文字在下，3–5 个，拇指最容易够到。"
description: "The primary navigation bar fixed at the bottom of a mobile app: 3–5 destinations, icon over label, thumb-first."
keywords: ["bottom tab bar mobile","component","navigation"]
platforms: ["ios","android","harmonyos","web-mobile"]
function: "navigation"
placements: ["bottom-tab"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "bottom-tab-bar"
prompts: ["mobile-tab-bar-prompt"]
effects: []
resources: ["tdesign","arkui","material-design-3","apple-hig"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

底部标签栏是 App 的主导航：把产品最重要的 3–5 个一级页面钉在屏幕底部，用户在任何一层都能一键切换。它由等宽的标签格组成，每格一个图标加一行小字，当前页的标签高亮，未读消息用角标提示。

## 什么时候用

App 有 3–5 个平级的一级功能，且用户会在它们之间频繁切换时——这是移动端的默认答案。

## 什么时候不用

一级功能超过 5 个（该用分组或抽屉）、或只有 1–2 个页面（不需要导航栏）时不用；也别把「发布」这种动作伪装成标签混进去（要做就做中间凸起按钮并明确它是动作）。

## 细节与变体

- 标签文字不超过 4 个字，图标用同一套线性图标，未选中态只描边、选中态填充或加粗
- 角标只标数字或红点，超过 99 显示 99+；角标是「有新东西」，不是装饰
- 高度适配安全区（Home Indicator），背景可带顶部 1px 分隔线或轻微毛玻璃
- 鸿蒙与安卓常用同样的结构，iOS 习惯高度略矮、图标略大
