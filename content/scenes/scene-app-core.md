---
id: "scene-app-core"
kind: "scene"
type: "prompt"
name_zh: "App 三屏骨架（首页+列表+详情）"
name_en: "App Three-Screen Skeleton"
summary_zh: "移动 App 最常见的三屏：底部标签栏框架 + 列表首页 + 内容详情。"
description: "The classic three-screen app skeleton: tab bar shell, list home, content detail."
keywords: ["scene","prompt","content"]
platforms: ["ios","android","harmonyos"]
function: "content"
placements: ["full-screen"]
granularity: "flow"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "scene"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
refs: [{"prompt":"mobile-tab-bar-prompt","version":"1.0.0","overrides":{}},{"prompt":"list-item-prompt","version":"1.0.0","overrides":{}},{"prompt":"detail-hero-prompt","version":"1.0.0","overrides":{}},{"prompt":"card-basic-prompt","version":"1.0.0","overrides":{}}]
entries: ["mobile-tab-bar","list-item","detail-hero","card-basic"]
layout_zh: "全局框架：底部标签栏常驻 4 个入口。首页为列表（列表行 + 穿插卡片），点任意行进详情页：头图区在上、正文滚动、底部操作条吸底；返回保留列表滚动位置。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

移动 App 最常见的三屏：底部标签栏框架 + 列表首页 + 内容详情。

## 版式说明

全局框架：底部标签栏常驻 4 个入口。首页为列表（列表行 + 穿插卡片），点任意行进详情页：头图区在上、正文滚动、底部操作条吸底；返回保留列表滚动位置。

## 引用的组件提示词

- `mobile-tab-bar-prompt` v1.0.0
- `list-item-prompt` v1.0.0
- `detail-hero-prompt` v1.0.0
- `card-basic-prompt` v1.0.0

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
