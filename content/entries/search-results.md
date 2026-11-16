---
id: "search-results"
kind: "entry"
type: "component"
name_zh: "搜索结果页"
name_en: "Search Results"
summary_zh: "搜完看到的那一页：顶部留着搜索词，下面结果列表，带筛选、排序和「没找到」的兜底。"
description: "The page after searching: the query stays on top, results below, with filters, sorting, and a no-results fallback."
keywords: ["search results","component","search"]
platforms: ["all"]
function: "search"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "search"
prompts: ["search-results-prompt"]
effects: []
resources: ["ant-design","mui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

搜索结果页要完成三件事：让用户确认搜对了（搜索词与结果数清楚）、快速缩小范围（筛选排序 sticky 在顶部）、没结果时不死胡同（纠错词、热门推荐、清筛选入口）。

## 什么时候用

任何带搜索功能的产品都需要它独立成页，承载筛选、分页与空结果状态。

## 什么时候不用

结果永远只有一屏且不需要筛选的轻量搜索（如设置内搜索）可以内嵌，不必成页。

## 细节与变体

- 命中关键词在标题里加粗或标色，用户扫读速度翻倍
- 筛选条件改变要保留滚动位置的一部分上下文，别粗暴回顶部
- 空结果先给「去掉某个筛选试试」，再给热门内容，不要先甩一张大哭脸
