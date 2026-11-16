---
id: "drawer-nav"
kind: "entry"
type: "component"
name_zh: "侧边导航（抽屉/侧栏）"
name_en: "Drawer / Sidebar Navigation"
summary_zh: "从左边滑出来或常驻左边的导航：一级、二级菜单都在里面，后台和复杂应用的主导航。"
description: "Navigation that slides in from the left or stays pinned there — the primary nav for dashboards and complex apps."
keywords: ["drawer sidebar navigation","component","navigation"]
platforms: ["web","desktop","tablet"]
function: "navigation"
placements: ["sidebar-left"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "drawer-sidebar"
prompts: ["drawer-nav-prompt"]
effects: ["sliding-tabs"]
resources: ["ant-design","carbon","shadcn-admin"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

侧边导航把多层菜单收在一列：顶部放产品名或账号，菜单按组排列，当前项高亮，可折叠成只剩图标的窄条给内容腾地方。移动端同结构变为抽屉，从左侧滑出、用完滑走。

## 什么时候用

菜单项超过 8 个、或有两级以上层级时——后台、文档站、设置中心都是它的主场。

## 什么时候不用

一级入口只有三五个时别用它（顶部标签或底部标签更直接）；营销页也别上侧栏，会打断阅读。

## 细节与变体

- 折叠态只留图标时，每个图标必须有气泡提示补文字
- 菜单分组之间留白或分隔线，组名小字大写或灰色
- 移动端抽屉打开时，背景要遮罩且点遮罩能关

配套效果见下方「可用效果」。
