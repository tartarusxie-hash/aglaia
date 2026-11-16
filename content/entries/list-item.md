---
id: "list-item"
kind: "entry"
type: "component"
name_zh: "基础列表行"
name_en: "List Item"
summary_zh: "最万能的内容行：左边头像或图标，中间标题与副文案，右边箭头或数值。"
description: "The universal content row: avatar or icon left, title and subtitle in the middle, chevron or value right."
keywords: ["list item","component","content"]
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
prompts: ["list-item-prompt"]
effects: []
resources: ["ant-design","mui","tdesign","getwidget"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

列表行是界面的基本粒子：左侧配件（头像、图标）、主副两行文字、右侧配件（箭头、数值、开关）三段式组合，换配件就能表达导航、信息、设置、联系人等几十种语义。整行可点，热区就是整行。

## 什么时候用

内容是同质条目、需要快速扫读和逐条进入时——联系人、文件、订单、文章都从它开始。

## 什么时候不用

条目之间差异大、图是主角时用卡片；需要横向比较字段时用表格，别用列表硬撑。

## 细节与变体

- 行高至少 48px，副文案比主文案小一号、弱一档颜色
- 右侧配件只放一个，两个配件并排用户会犹豫点哪个
- 可滑动出操作（删除/置顶）时要给点击替代，老用户找不到滑动
