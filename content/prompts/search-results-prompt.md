---
id: "search-results-prompt"
kind: "prompt"
type: "prompt"
name_zh: "搜索结果页 · 提示词"
name_en: "Search Results Prompt"
summary_zh: "生成「搜索结果页」的填空式提示词"
description: "Fill-in prompt that generates a Search Results component"
keywords: ["prompt","component","search-results"]
platforms: ["all"]
function: "search"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "search-results"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{layout}}","type":"enum","default":"列表","range":"列表 / 宫格","unit":""},{"name":"{{filters}}","type":"text","default":"分类、价格、评分","range":"2–5 个维度","unit":""},{"name":"{{highlight}}","type":"enum","default":"命中词加粗","range":"加粗 / 标色","unit":""}]
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 角色 Role

你是一名资深产品设计师兼前端工程师，深谙移动与 Web 界面规范，输出的设计克制、标准、可直接开发。

## 任务 Task

为我生成一个「搜索结果页」组件。用途：搜完看到的那一页：顶部留着搜索词，下面结果列表，带筛选、排序和「没找到」的兜底。使用场景：任何带搜索功能的产品都需要它独立成页，承载筛选、分页与空结果状态。

## 效果描述 Description

搜索结果页要完成三件事：让用户确认搜对了（搜索词与结果数清楚）、快速缩小范围（筛选排序 sticky 在顶部）、没结果时不死胡同（纠错词、热门推荐、清筛选入口）。

细节要求：
- 命中关键词在标题里加粗或标色，用户扫读速度翻倍
- 筛选条件改变要保留滚动位置的一部分上下文，别粗暴回顶部
- 空结果先给「去掉某个筛选试试」，再给热门内容，不要先甩一张大哭脸

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{layout}} | enum | 列表 | 列表 / 宫格 |
| {{filters}} | text | 分类、价格、评分 | 2–5 个维度 |
| {{highlight}} | enum | 命中词加粗 | 加粗 / 标色 |

## 约束 Constraints

- 不要这样做：结果永远只有一屏且不需要筛选的轻量搜索（如设置内搜索）可以内嵌，不必成页。

- 触控目标至少 44×44（Web 鼠标场景至少 24px），正文不小于 14px；
- 颜色对比满足 WCAG AA（正文 ≥4.5:1）；状态不能只靠颜色区分；
- 文案用我给的真实内容占位：【在此粘贴真实文案，如标题、按钮字】，不要用 Lorem ipsum；
- 只实现这一个组件，不要顺带生成整页或其他组件。

## 框架目标 Target

【html-css / tailwind / react，三选一，默认 html-css】

## 输出格式 Output

输出完整可运行代码，并逐项自检：

- [ ] 结构与「效果描述」一致，参数与参数表一致；
- [ ] 包含默认 / 悬停 / 按下 / 禁用等必要状态；
- [ ] 键盘可达，焦点样式可见；
- [ ] 在 375px 宽移动屏与 1440px 桌面屏下都不溢出、不重叠。

（验证状态：待复验。本条提示词尚未经真实模型实测，验证字段如实留空。）
