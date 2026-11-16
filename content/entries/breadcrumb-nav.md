---
id: "breadcrumb-nav"
kind: "entry"
type: "component"
name_zh: "面包屑"
name_en: "Breadcrumb"
summary_zh: "「首页 / 分类 / 当前页」一行小字：告诉你在哪一层，还能点回去。"
description: "A one-line trail — Home / Category / Current — showing your level and letting you jump back up."
keywords: ["breadcrumb","component","navigation"]
platforms: ["web","desktop"]
function: "navigation"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "breadcrumb"
prompts: ["breadcrumb-nav-prompt"]
effects: []
resources: ["primer","carbon","ant-design"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

面包屑把当前页在网站层级中的位置摊开成一行可点的路径，每一级都是链接，当前页不可点。它占地极小，却同时解决了「我在哪」和「怎么回上层」。

## 什么时候用

层级 ≥3 的内容型网站：文档、电商分类、后台多级页面。

## 什么时候不用

层级只有 2 层、或流程型页面（结算、表单向导）别用——前者多余，后者会诱使用户跳步。

## 细节与变体

- 移动端空间紧时只保留上一层加一个返回箭头
- 当前页用正文色、祖先级用弱化色并带下划线 hover
- 层级太深时中间折叠成「…」，点开再展开
