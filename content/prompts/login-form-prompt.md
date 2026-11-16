---
id: "login-form-prompt"
kind: "prompt"
type: "prompt"
name_zh: "登录表单 · 提示词"
name_en: "Login Form Prompt"
summary_zh: "生成「登录表单」的填空式提示词"
description: "Fill-in prompt that generates a Login Form component"
keywords: ["prompt","component","login-form"]
platforms: ["all"]
function: "account"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "login-form"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{methods}}","type":"enum","default":"密码 + 验证码 + 第三方","range":"密码 / 验证码 / 第三方组合","unit":""},{"name":"{{agreement}}","type":"enum","default":"含协议勾选","range":"含 / 不含","unit":""},{"name":"{{error-style}}","type":"enum","default":"字段下方红字","range":"字段下方 / 顶部汇总","unit":""}]
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

为我生成一个「登录表单」组件。用途：输账号密码（或验证码）进门的那张表单：字段少、报错清、还能第三方一键登录。使用场景：任何需要账号的产品的入口页；注册表单是在它基础上加确认与协议，不另起炉灶。

## 效果描述 Description

登录表单是转化漏斗最窄的一环：账号、密码两个字段打底，验证码登录和第三方登录做备选，忘记密码入口贴身放，协议勾选合规前置。报错要具体到字段，告诉用户错在哪、怎么改。

细节要求：
- 密码框带「眼睛」切换可见，验证码带倒计时重发
- 键盘类型要对：手机号调数字键盘，邮箱关自动大写
- 登录按钮在输入不完整时置灰，但别隐藏——用户要知道还差什么

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{methods}} | enum | 密码 + 验证码 + 第三方 | 密码 / 验证码 / 第三方组合 |
| {{agreement}} | enum | 含协议勾选 | 含 / 不含 |
| {{error-style}} | enum | 字段下方红字 | 字段下方 / 顶部汇总 |

## 约束 Constraints

- 不要这样做：能用游客模式先体验的产品，别在打开第一屏就堵登录墙——先给价值，再要账号。

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
