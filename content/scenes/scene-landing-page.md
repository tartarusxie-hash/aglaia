---
id: "scene-landing-page"
kind: "scene"
type: "prompt"
name_zh: "产品落地页"
name_en: "Product Landing Page"
summary_zh: "官网落地页整页：页眉、Hero、定价表的转化三段式。"
description: "A full landing page: header, hero, and pricing — the conversion trio."
keywords: ["scene","prompt","marketing"]
platforms: ["web"]
function: "marketing"
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
refs: [{"prompt":"web-header-prompt","version":"1.0.0","overrides":{}},{"prompt":"hero-section-prompt","version":"1.0.0","overrides":{}},{"prompt":"pricing-table-prompt","version":"1.0.0","overrides":{}}]
entries: ["web-header","hero-section","pricing-table"]
layout_zh: "页眉吸顶；Hero 左文右图、主 CTA 唯一；中段可插特性与评价（复用卡片组件）；定价表三档居中推荐；页脚收尾再放一个 CTA。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

官网落地页整页：页眉、Hero、定价表的转化三段式。

## 版式说明

页眉吸顶；Hero 左文右图、主 CTA 唯一；中段可插特性与评价（复用卡片组件）；定价表三档居中推荐；页脚收尾再放一个 CTA。

## 引用的组件提示词

- `web-header-prompt` v1.0.0
- `hero-section-prompt` v1.0.0
- `pricing-table-prompt` v1.0.0

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
