---
id: "scene-content-detail"
kind: "scene"
type: "prompt"
name_zh: "内容详情页"
name_en: "Content Detail Page"
summary_zh: "文章/内容详情整页：顶栏、头图区、正文与底部操作弹层。"
description: "A full content detail page: app bar, hero block, body, and a bottom-sheet action menu."
keywords: ["scene","prompt","content"]
platforms: ["ios","android","harmonyos","web"]
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
refs: [{"prompt":"top-app-bar-prompt","version":"1.0.0","overrides":{}},{"prompt":"detail-hero-prompt","version":"1.0.0","overrides":{}},{"prompt":"bottom-sheet-prompt","version":"1.0.0","overrides":{}}]
entries: ["top-app-bar","detail-hero","bottom-sheet"]
layout_zh: "顶部应用栏（返回/标题/分享）；头图区后接正文；点分享升起底部分享弹层；底部操作条吸底（收藏 + 评论入口）。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

文章/内容详情整页：顶栏、头图区、正文与底部操作弹层。

## 版式说明

顶部应用栏（返回/标题/分享）；头图区后接正文；点分享升起底部分享弹层；底部操作条吸底（收藏 + 评论入口）。

## 引用的组件提示词

- `top-app-bar-prompt` v1.0.0
- `detail-hero-prompt` v1.0.0
- `bottom-sheet-prompt` v1.0.0

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
