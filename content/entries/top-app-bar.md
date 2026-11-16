---
id: "top-app-bar"
kind: "entry"
type: "component"
name_zh: "顶部应用栏"
name_en: "Top App Bar"
summary_zh: "页面最上面那条：返回、标题、常用操作，一眼看清「我在哪、能干嘛」。"
description: "The bar at the very top of a page: back button, title, and the page's key actions."
keywords: ["top app bar","component","navigation"]
platforms: ["all"]
function: "navigation"
placements: ["top-nav"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "top-navigation"
prompts: ["top-app-bar-prompt"]
effects: ["focus-ring"]
resources: ["ant-design","mui","tdesign"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

顶部应用栏承载三件事：告诉用户当前页是什么（标题）、怎么回去（返回或菜单）、这一页最重要的操作（右侧 1–3 个图标按钮）。滚动时可固定在顶部，长标题截断省略。

## 什么时候用

几乎每个页面都需要它——尤其是从列表进入的二级页面，返回和标题缺一不可。

## 什么时候不用

沉浸式页面（图片详情、视频播放）可以让它透明或自动隐藏；全站级的网站导航不要用它代替（那是网站页眉）。

## 细节与变体

- 右侧操作超过 3 个就把低频的收进「更多」菜单，别一字排开
- 标题过长用省略号，不要缩小字号硬塞
- 返回按钮的热区至少 44×44，哪怕图标只有 20px

配套效果见下方「可用效果」。
