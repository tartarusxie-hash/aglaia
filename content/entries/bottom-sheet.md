---
id: "bottom-sheet"
kind: "entry"
type: "component"
name_zh: "底部弹层"
name_en: "Bottom Sheet"
summary_zh: "从屏幕底部升起来的半屏面板：分享、筛选、选规格——拇指够得着，还能下拉关掉。"
description: "A panel that rises from the bottom of the screen: share, filter, pick a variant — thumb-reachable, swipe down to dismiss."
keywords: ["bottom sheet","component","overlay"]
platforms: ["ios","android","harmonyos","web-mobile"]
function: "overlay"
placements: ["bottom-sheet"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "modals-overlays"
prompts: ["bottom-sheet-prompt"]
effects: ["entrance-motion"]
resources: ["ant-design","tdesign","radix-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

底部弹层是移动端的浮层主力：从底部升起，顶部有拖拽条暗示可以拉动，下拉或点遮罩关闭。它比居中弹窗更顺手（拇指区），又比全屏页更轻（背景还看得见上下文）。

## 什么时候用

移动端的分享、筛选、选择器、商品规格、操作菜单——需要上下文又需要空间时。

## 什么时候不用

内容需要长时间编辑（写长文）时别用弹层，空间和键盘都会打架，去全屏页。

## 细节与变体

- 高度超过 70% 就该考虑全屏页，弹层里再滚动长列表体验很差
- 打开时背景页要锁定滚动，否则两层一起滚
- 拖拽条只是提示，关闭按钮或手势要真实可发现

配套效果见下方「可用效果」。
