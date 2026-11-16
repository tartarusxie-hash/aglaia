---
id: "checkout-form-prompt"
kind: "prompt"
type: "prompt"
name_zh: "结算表单 · 提示词"
name_en: "Checkout Form Prompt"
summary_zh: "生成「结算表单」的填空式提示词"
description: "Fill-in prompt that generates a Checkout Form component"
keywords: ["prompt","component","checkout-form"]
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
entry: "checkout-form"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{steps}}","type":"enum","default":"单页完成","range":"单页 / 分步（地址→支付→确认）","unit":""},{"name":"{{summary}}","type":"enum","default":"右侧/底部金额明细","range":"明细位置","unit":""},{"name":"{{payment-methods}}","type":"text","default":"微信、支付宝、银行卡","range":"2–4 种","unit":""}]
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

为我生成一个「结算表单」组件。用途：付钱前最后一段路：确认商品、选地址、看优惠、选支付方式、点下单。使用场景：一切电商与付费服务的付款环节；步骤指示器在这里告诉用户还剩几步。

## 效果描述 Description

结算表单的目标是让用户安心地把钱付完：金额明细永远可见且可展开核对，地址与支付方式给默认选中项减少操作，优惠自动抵扣并说明，每一步都有明确的总价。分步还是单页取决于信息量，移动端多为单页滚动。

细节要求：
- 总价在提交按钮上再写一遍，用户点之前不用回滚确认
- 报错定位到具体字段并自动滚动过去，别只在顶部飘一句「提交失败」
- 离开结算页再回来，填过的信息要保留（草稿态）

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{steps}} | enum | 单页完成 | 单页 / 分步（地址→支付→确认） |
| {{summary}} | enum | 右侧/底部金额明细 | 明细位置 |
| {{payment-methods}} | text | 微信、支付宝、银行卡 | 2–4 种 |

## 约束 Constraints

- 不要这样做：单件数字商品（付完即得）可以缩到一个支付弹窗，别用整页结算吓退冲动消费。

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
