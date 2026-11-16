---
id: "card-basic"
kind: "entry"
type: "component"
name_zh: "基础卡片"
name_en: "Basic Card"
summary_zh: "一块内容一个卡：图在上、标题摘要在下，带一两个操作——商品、文章、课程都用它装。"
description: "One piece of content per card: media on top, title and summary below, one or two actions."
keywords: ["basic card","component","content"]
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
pattern: "card"
prompts: ["card-basic-prompt"]
effects: ["card-lift","spotlight-card"]
resources: ["ant-design","mantine","magic-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

基础卡片是最通用的内容容器：媒体区、标题、摘要、元信息、操作区自上而下，用边框或阴影从背景里浮出来。网格里等高对齐、列表里通栏排，都成立。

## 什么时候用

内容条目需要图文混排且条目间地位平等时——Feed、课程列表、作品集的第一选择。

## 什么时候不用

纯文字短条目用列表行更省空间；数据字段多的条目用表格，卡片装不下比较。

## 细节与变体

- 标题最多两行、摘要最多两行，超出省略——卡片的整齐靠截断纪律
- 整卡可点时，卡内不要再放第二个可点元素（嵌套点击是事故源）
- 阴影和边框二选一，描边 + 大阴影会显脏

配套效果见下方「可用效果」。
