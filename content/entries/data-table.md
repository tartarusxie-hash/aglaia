---
id: "data-table"
kind: "entry"
type: "component"
name_zh: "数据表格"
name_en: "Data Table"
summary_zh: "后台的命根子：一列一个字段，表头能排序，行尾有操作，底部分页。"
description: "The backbone of admin UIs: one field per column, sortable headers, row actions, pagination at the bottom."
keywords: ["data table","component","data"]
platforms: ["web","desktop"]
function: "data"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "data-display"
prompts: ["data-table-prompt"]
effects: []
resources: ["ant-design","carbon","mui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

数据表格为「大量同构数据的查找与处理」而生：表头支持排序与筛选，行支持勾选批量操作，长文本截断、状态用徽章、金额右对齐。密度可调是标配，因为运营和财务看同一张表的耐心完全不同。

## 什么时候用

记录数超过 20 条、字段超过 4 列、需要对比与批量操作时——它没有对手。

## 什么时候不用

移动端别硬塞表格：转成卡片列表；字段只有两三个时列表更轻。

## 细节与变体

- 行内操作超过 2 个必须收进「更多」，否则每行都是一排按钮墙
- 空表格也要保留表头并给空状态说明，别只剩一片白
- 固定第一列或表头吸顶，长表滚动时不迷路
