---
id: "scene-shop-home"
kind: "scene"
type: "prompt"
name_zh: "商城首页"
name_en: "Shop Home"
summary_zh: "电商 App 首页：搜索、轮播、商品瀑布与底部导航的完整组合。"
description: "An e-commerce home: search bar, carousel, product masonry, and bottom tabs."
keywords: ["scene","prompt","commerce"]
platforms: ["ios","android","harmonyos","web-mobile"]
function: "commerce"
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
refs: [{"prompt":"search-bar-prompt","version":"1.0.0","overrides":{}},{"prompt":"image-carousel-prompt","version":"1.0.0","overrides":{"{{autoplay}}":"自动（可暂停）"}},{"prompt":"product-card-prompt","version":"1.0.0","overrides":{}},{"prompt":"masonry-grid-prompt","version":"1.0.0","overrides":{}},{"prompt":"mobile-tab-bar-prompt","version":"1.0.0","overrides":{}}]
entries: ["search-bar","image-carousel","product-card","masonry-grid","mobile-tab-bar"]
layout_zh: "自上而下单列滚动：搜索框吸顶 → 轮播（≤5 张）→ 快捷分类一行 → 商品瀑布流；底部标签栏常驻，购物车标签带角标。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

电商 App 首页：搜索、轮播、商品瀑布与底部导航的完整组合。

## 版式说明

自上而下单列滚动：搜索框吸顶 → 轮播（≤5 张）→ 快捷分类一行 → 商品瀑布流；底部标签栏常驻，购物车标签带角标。

## 引用的组件提示词

- `search-bar-prompt` v1.0.0
- `image-carousel-prompt` v1.0.0，覆盖参数：{{autoplay}} = 自动（可暂停）
- `product-card-prompt` v1.0.0
- `masonry-grid-prompt` v1.0.0
- `mobile-tab-bar-prompt` v1.0.0

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
