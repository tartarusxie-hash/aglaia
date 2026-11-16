---
id: "grouped-list"
kind: "entry"
type: "component"
name_zh: "分组列表"
name_en: "Grouped List"
summary_zh: "带组头的列表：组名小字压在每组上方，滚动时组头吸顶，A–Z 索引还能点字母跳。"
description: "A list with group headers: small group titles above each section; headers can stick, with an A–Z index for jumping."
keywords: ["grouped list","component","content"]
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
pattern: "list"
prompts: ["grouped-list-prompt"]
effects: []
resources: ["ant-design","mui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

分组列表在基础列表之上加一层秩序：按类别、时间或字母把行分段，组头说明这一段是什么。长列表配吸顶组头（永远知道自己在哪组）和右侧字母索引（点字母直达），通讯录就是经典形态。

## 什么时候用

条目超过 30 条且有自然分组依据时——通讯录、城市选择、按日期归档的记录。

## 什么时候不用

条目不多（<15）或分组依据是硬凑的时别用，组头只会切碎阅读节奏。

## 细节与变体

- 组头背景与行背景要有区分（浅一档或加粗小字），但别用重色块
- 索引条热区要宽（至少 20px），字母本身可以只有 10px
- 空组不渲染组头，避免出现只有标题没有内容的尴尬段
