---
id: "picker-select"
kind: "entry"
type: "component"
name_zh: "选择器"
name_en: "Picker / Select"
summary_zh: "点一下弹出一列选项让你挑：城市、日期、分类——不用打字，从现成的里选。"
description: "Tap to open a list of options — city, date, category: choose from what exists instead of typing."
keywords: ["picker select","component","form"]
platforms: ["all"]
function: "form"
placements: ["bottom-sheet","content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "forms"
prompts: ["picker-select-prompt"]
effects: ["dropdown-menu","sliding-tabs"]
resources: ["ant-design","mantine","radix-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

选择器把「输入」变「挑选」：触发器长得像输入框，点开后移动端从底部升起滚轮或列表，桌面端展开下拉。选项多时带搜索，选完触发器显示结果，带清除小叉。

## 什么时候用

选项来自固定集合（城市、类目、状态）时——挑永远比打字快且不出错。

## 什么时候不用

选项只有 2–4 个时直接平铺单选按钮，别藏进选择器多一次点击；自由文本更别伪装成选择器。

## 细节与变体

- 选项超過 20 个必须给搜索或分组，否则滚动找选项是酷刑
- 默认选中要有理由（最近用过/最常用），别默认第一个糊弄
- 多选时触发器显示「已选 3 项」而不是把名字全塞进去溢出

配套效果见下方「可用效果」。
