---
id: "dashboard-cards-prompt"
kind: "prompt"
type: "prompt"
name_zh: "仪表盘指标卡组 · 提示词"
name_en: "Dashboard Stat Cards Prompt"
summary_zh: "生成「仪表盘指标卡组」的填空式提示词"
description: "Fill-in prompt that generates a Dashboard Stat Cards component"
keywords: ["prompt","component","dashboard-cards"]
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
entry: "dashboard-cards"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{card-count}}","type":"enum","default":"4","range":"3–5 张","unit":""},{"name":"{{delta}}","type":"enum","default":"环比涨跌","range":"环比 / 同比","unit":""},{"name":"{{sparkline}}","type":"enum","default":"带迷你折线","range":"有 / 无","unit":""}]
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

为我生成一个「仪表盘指标卡组」组件。用途：后台首页那排数字卡：今日订单、新增用户、转化率，每个带涨跌箭头和小趋势。使用场景：后台、数据产品、运营看板的首屏第一行——回答「现在怎么样」。

## 效果描述 Description

指标卡组把经营健康度压缩成排得整齐的数字：每张卡一个指标——名称、当前值、与上期对比的涨跌、一条迷你趋势线。涨跌颜色要有语义纪律（成本类指标涨了是坏事就该红）。点卡可下钻到明细。

细节要求：
- 涨跌箭头方向与颜色分开编码：箭头说方向，颜色说好坏，两者别打架
- 数字滚动动画只用在首次加载，别每次刷新都表演一遍
- 卡与卡之间口径周期必须一致（都是今日或都是本月）

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{card-count}} | enum | 4 | 3–5 张 |
| {{delta}} | enum | 环比涨跌 | 环比 / 同比 |
| {{sparkline}} | enum | 带迷你折线 | 有 / 无 |

## 约束 Constraints

- 不要这样做：指标超过 6 个时先砍到关键 4 个，其余进图表区；数字本身需要解释口径的，要给悬停说明。

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
