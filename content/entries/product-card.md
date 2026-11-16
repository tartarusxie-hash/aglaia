---
id: "product-card"
kind: "entry"
type: "component"
name_zh: "商品卡"
name_en: "Product Card"
summary_zh: "卖货的卡：商品图、名字、价格、销量或评价，点进去就是详情。"
description: "The selling card: product image, name, price, and sales or rating — tap through to the detail page."
keywords: ["product card","component","commerce"]
platforms: ["all"]
function: "commerce"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "card"
prompts: ["product-card-prompt"]
effects: ["card-lift","image-zoom"]
resources: ["gestalt","magic-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

商品卡为「快速比较后下单」优化：图占一半以上建立欲望，名字两行讲清是什么，价格用最大字重抢视线，原价划线造锚点，销量/评分给信任。促销角标只贴一个，多了互相抵消。

## 什么时候用

电商列表、推荐位、搜索结果——一切陈列商品的地方。

## 什么时候不用

只有三五个商品的精品陈列可以放大图做编辑式排版，别用统一卡片把气质磨平。

## 细节与变体

- 价格的小数位、货币符号字号要小于整数部分，这是行业惯例
- 图加载前用同色块占位，防止卡片高度跳动
- 「已售罄」状态直接压在图上置灰，不要等点进去才发现

配套效果见下方「可用效果」。
