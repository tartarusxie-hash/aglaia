---
id: "pricing-table-prompt"
kind: "prompt"
type: "prompt"
name_zh: "定价表 · 提示词"
name_en: "Pricing Table Prompt"
summary_zh: "生成「定价表」的填空式提示词"
description: "Fill-in prompt that generates a Pricing Table component"
keywords: ["prompt","component","pricing-table"]
platforms: ["web"]
function: "marketing"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "pricing-table"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{tier-count}}","type":"enum","default":"3","range":"2–4 档","unit":""},{"name":"{{featured}}","type":"enum","default":"中间档推荐","range":"推荐档位置","unit":""},{"name":"{{billing-toggle}}","type":"enum","default":"月付/年付切换","range":"有 / 无","unit":""}]
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

为我生成一个「定价表」组件。用途：三列套餐并排比：免费、专业、企业，中间那列放大加框写着「最受欢迎」。使用场景：有 2–4 档订阅或套餐的产品官网定价页。

## 效果描述 Description

定价表把套餐差异做成可一眼横向比较的列：每列一个价格锚点、一段功能清单（有打勾、无划掉或留空）、一个 CTA。推荐档用边框、角标、放大从视觉上「被选中」。月付/年付切换时价格数字要跟着变并标清折算。

细节要求：
- 功能清单按用户关心的顺序排，不要按内部模块顺序
- 推荐档的特殊样式克制：一处角标 + 边框足矣，全列涂色太吵
- 年付价要写清「按年支付，折合每月 X」，别玩数字游戏

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{tier-count}} | enum | 3 | 2–4 档 |
| {{featured}} | enum | 中间档推荐 | 推荐档位置 |
| {{billing-toggle}} | enum | 月付/年付切换 | 有 / 无 |

## 约束 Constraints

- 不要这样做：价格需要面谈的企业级产品放「联系销售」即可，别硬编数字；单档定价更不需要表格。

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
