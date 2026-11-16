---
id: "cart-item-prompt"
kind: "prompt"
type: "prompt"
name_zh: "购物车条目 · 提示词"
name_en: "Cart Item Prompt"
summary_zh: "生成「购物车条目」的填空式提示词"
description: "Fill-in prompt that generates a Cart Item component"
keywords: ["prompt","component","cart-item"]
platforms: ["all"]
function: "commerce"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "cart-item"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{stepper}}","type":"enum","default":"数量步进器","range":"步进器样式","unit":""},{"name":"{{swipe-delete}}","type":"enum","default":"左滑删除","range":"有 / 无","unit":""},{"name":"{{select-all}}","type":"enum","default":"底部全选+合计","range":"有","unit":""}]
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

为我生成一个「购物车条目」组件。用途：购物车里的一行：小图、名字、价格、数量步进器和一个勾选框，左滑还能删。使用场景：多件商品一起结算的电商购物车页；单件购买直接走结算，不需要购物车中转。

## 效果描述 Description

购物车条目为「批量决策」优化：勾选框决定买不买，步进器调数量，左滑删除清仓，底部结算条实时合计选中金额。失效商品（下架/无货）要单独分组置灰，不和正常商品混排。

细节要求：
- 数量减到 0 时弹确认删除，不要直接消失让用户以为点错了
- 合计金额只算勾选项，并实时跟随勾选变化跳动提示
- 步进器的加减按钮热区至少 32px，购物车是高频操作区

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{stepper}} | enum | 数量步进器 | 步进器样式 |
| {{swipe-delete}} | enum | 左滑删除 | 有 / 无 |
| {{select-all}} | enum | 底部全选+合计 | 有 |

## 约束 Constraints

- 不要这样做：只有一两种商品的小店别建购物车页，多一步就多一层流失。

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
