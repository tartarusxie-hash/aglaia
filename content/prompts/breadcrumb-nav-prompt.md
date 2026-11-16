---
id: "breadcrumb-nav-prompt"
kind: "prompt"
type: "prompt"
name_zh: "面包屑 · 提示词"
name_en: "Breadcrumb Prompt"
summary_zh: "生成「面包屑」的填空式提示词"
description: "Fill-in prompt that generates a Breadcrumb component"
keywords: ["prompt","component","breadcrumb-nav"]
platforms: ["web","desktop"]
function: "navigation"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "breadcrumb-nav"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{separator}}","type":"enum","default":"/","range":"/ / > / ·","unit":""},{"name":"{{levels}}","type":"enum","default":"3","range":"2–5 层","unit":""},{"name":"{{collapse-middle}}","type":"enum","default":"折叠中间层","range":"折叠 / 全部展开","unit":""}]
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

为我生成一个「面包屑」组件。用途：「首页 / 分类 / 当前页」一行小字：告诉你在哪一层，还能点回去。使用场景：层级 ≥3 的内容型网站：文档、电商分类、后台多级页面。

## 效果描述 Description

面包屑把当前页在网站层级中的位置摊开成一行可点的路径，每一级都是链接，当前页不可点。它占地极小，却同时解决了「我在哪」和「怎么回上层」。

细节要求：
- 移动端空间紧时只保留上一层加一个返回箭头
- 当前页用正文色、祖先级用弱化色并带下划线 hover
- 层级太深时中间折叠成「…」，点开再展开

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{separator}} | enum | / | / / > / · |
| {{levels}} | enum | 3 | 2–5 层 |
| {{collapse-middle}} | enum | 折叠中间层 | 折叠 / 全部展开 |

## 约束 Constraints

- 不要这样做：层级只有 2 层、或流程型页面（结算、表单向导）别用——前者多余，后者会诱使用户跳步。

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
