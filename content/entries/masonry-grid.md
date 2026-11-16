---
id: "masonry-grid"
kind: "entry"
type: "component"
name_zh: "瀑布流"
name_en: "Masonry Grid"
summary_zh: "两列错落排图：高的高矮的矮，像小红书和 Pinterest 那样越逛越上头。"
description: "Two staggered columns of images at natural heights — the Pinterest-style browsing layout."
keywords: ["masonry grid","component","content"]
platforms: ["all"]
function: "content"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "grid-masonry"
prompts: ["masonry-grid-prompt"]
effects: ["image-zoom"]
resources: ["gestalt"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

瀑布流按内容原始比例排布，消灭裁切和留白，让图片自己决定高度。它牺牲阅读顺序换取浏览密度和新鲜感，是内容发现型产品的发动机。

## 什么时候用

图片为主、鼓励漫无目的浏览的产品：灵感、穿搭、菜谱、设计图。

## 什么时候不用

内容需要顺序（教程步骤）、或每条都要仔细读（新闻列表）时别用，错落会打乱理解。

## 细节与变体

- 列宽固定、只让高度变，混进视频卡时先定封面比例再插入
- 加载更多时新内容只往列尾追加，不能重排已有内容（用户会丢失位置）
- 标题区高度不齐是常态，别为了对齐把标题区做成等高裁切

配套效果见下方「可用效果」。
