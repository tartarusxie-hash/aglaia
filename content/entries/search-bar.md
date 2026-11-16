---
id: "search-bar"
kind: "entry"
type: "component"
name_zh: "搜索框"
name_en: "Search Bar"
summary_zh: "带放大镜的那个输入框：圆角胶囊、浅灰底，里面写着「搜你想要的」。"
description: "The search input: magnifier icon, pill shape, light background, placeholder hinting what to search."
keywords: ["search bar","component","search"]
platforms: ["all"]
function: "search"
placements: ["top-nav","content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "search"
prompts: ["search-bar-prompt"]
effects: ["focus-ring"]
resources: ["ant-design","tdesign","mui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

搜索框是用户主动表达需求的入口：放大镜图标定身份，浅底弱边降低压迫感，占位符给示例。电商和内容产品常在占位符里轮播热词，右侧挂语音、扫码等快捷输入。

## 什么时候用

内容量大到翻页找不到、或用户目的明确（来搜某个东西）时，它应该在首屏最显眼处。

## 什么时候不用

内容总量只有几十条的产品别把搜索放首屏 C 位——用户更需要的是分类浏览。

## 细节与变体

- 点击后进入独立搜索页（带历史与热词），不要在当前页硬展开
- 输入框热区高度至少 40px，图标只是视觉中心不是热区边界
- 占位符轮播要慢（≥3 秒一条）且可被真实输入打断

配套效果见下方「可用效果」。
