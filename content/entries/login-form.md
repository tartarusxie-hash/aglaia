---
id: "login-form"
kind: "entry"
type: "component"
name_zh: "登录表单"
name_en: "Login Form"
summary_zh: "输账号密码（或验证码）进门的那张表单：字段少、报错清、还能第三方一键登录。"
description: "The form that gets users in: account + password or code, clear errors, optional social sign-in."
keywords: ["login form","component","account"]
platforms: ["all"]
function: "account"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "auth"
prompts: ["login-form-prompt"]
effects: ["focus-ring"]
resources: ["shadcn-ui","mantine","obytes-rn-template"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

登录表单是转化漏斗最窄的一环：账号、密码两个字段打底，验证码登录和第三方登录做备选，忘记密码入口贴身放，协议勾选合规前置。报错要具体到字段，告诉用户错在哪、怎么改。

## 什么时候用

任何需要账号的产品的入口页；注册表单是在它基础上加确认与协议，不另起炉灶。

## 什么时候不用

能用游客模式先体验的产品，别在打开第一屏就堵登录墙——先给价值，再要账号。

## 细节与变体

- 密码框带「眼睛」切换可见，验证码带倒计时重发
- 键盘类型要对：手机号调数字键盘，邮箱关自动大写
- 登录按钮在输入不完整时置灰，但别隐藏——用户要知道还差什么

配套效果见下方「可用效果」。
