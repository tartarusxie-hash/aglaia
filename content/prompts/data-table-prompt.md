---
id: "data-table-prompt"
kind: "prompt"
type: "prompt"
name_zh: "数据表格 · 提示词"
name_en: "Data Table Prompt"
summary_zh: "生成「数据表格」的填空式提示词"
description: "Fill-in prompt that generates a Data Table component"
keywords: ["prompt","component","data-table"]
platforms: ["web","desktop"]
function: "data"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "data-table"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{row-actions}}","type":"enum","default":"行尾文字按钮×2","range":"1–3 个 + 更多菜单","unit":""},{"name":"{{pagination}}","type":"enum","default":"分页","range":"分页 / 无限滚动","unit":""},{"name":"{{density}}","type":"enum","default":"标准","range":"紧凑 / 标准 / 宽松","unit":""}]
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

为我生成一个「数据表格」组件。用途：后台的命根子：一列一个字段，表头能排序，行尾有操作，底部分页。使用场景：记录数超过 20 条、字段超过 4 列、需要对比与批量操作时——它没有对手。

## 效果描述 Description

数据表格为「大量同构数据的查找与处理」而生：表头支持排序与筛选，行支持勾选批量操作，长文本截断、状态用徽章、金额右对齐。密度可调是标配，因为运营和财务看同一张表的耐心完全不同。

细节要求：
- 行内操作超过 2 个必须收进「更多」，否则每行都是一排按钮墙
- 空表格也要保留表头并给空状态说明，别只剩一片白
- 固定第一列或表头吸顶，长表滚动时不迷路

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{row-actions}} | enum | 行尾文字按钮×2 | 1–3 个 + 更多菜单 |
| {{pagination}} | enum | 分页 | 分页 / 无限滚动 |
| {{density}} | enum | 标准 | 紧凑 / 标准 / 宽松 |

## 约束 Constraints

- 不要这样做：移动端别硬塞表格：转成卡片列表；字段只有两三个时列表更轻。

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
