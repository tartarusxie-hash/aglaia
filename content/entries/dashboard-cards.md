---
id: "dashboard-cards"
kind: "entry"
type: "component"
name_zh: "仪表盘指标卡组"
name_en: "Dashboard Stat Cards"
summary_zh: "后台首页那排数字卡：今日订单、新增用户、转化率，每个带涨跌箭头和小趋势。"
description: "The row of metric cards on a dashboard home: today's orders, new users, conversion — each with a delta and a sparkline."
keywords: ["dashboard stat cards","component","data"]
platforms: ["web","desktop"]
function: "data"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "dashboard"
prompts: ["dashboard-cards-prompt"]
effects: ["animated-counter","progress-ring"]
resources: ["carbon","tabler","shadcn-admin"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

指标卡组把经营健康度压缩成排得整齐的数字：每张卡一个指标——名称、当前值、与上期对比的涨跌、一条迷你趋势线。涨跌颜色要有语义纪律（成本类指标涨了是坏事就该红）。点卡可下钻到明细。

## 什么时候用

后台、数据产品、运营看板的首屏第一行——回答「现在怎么样」。

## 什么时候不用

指标超过 6 个时先砍到关键 4 个，其余进图表区；数字本身需要解释口径的，要给悬停说明。

## 细节与变体

- 涨跌箭头方向与颜色分开编码：箭头说方向，颜色说好坏，两者别打架
- 数字滚动动画只用在首次加载，别每次刷新都表演一遍
- 卡与卡之间口径周期必须一致（都是今日或都是本月）

配套效果见下方「可用效果」。
