---
id: "scene-auth-flow"
kind: "scene"
type: "prompt"
name_zh: "登录注册流程"
name_en: "Sign-in / Sign-up Flow"
summary_zh: "从打开 App 到登录成功的一整套：登录表单 + 输入规范 + 结果反馈。"
description: "The full sign-in flow: login form, field rules, and result feedback."
keywords: ["scene","prompt","account"]
platforms: ["ios","android","harmonyos","web"]
function: "account"
placements: ["full-screen"]
granularity: "flow"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "scene"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
refs: [{"prompt":"login-form-prompt","version":"1.0.0","overrides":{}},{"prompt":"text-field-prompt","version":"1.0.0","overrides":{}},{"prompt":"toast-prompt","version":"1.0.0","overrides":{"{{position}}":"顶部居中"}}]
entries: ["login-form","text-field","toast"]
layout_zh: "整屏单列：顶部品牌区（Logo + 一句欢迎），中部登录表单，第三方登录在分隔线下方，协议勾选贴表单底部；登录成功用 Toast 回执并跳转首页，失败在字段下方报错，不弹 Toast。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

从打开 App 到登录成功的一整套：登录表单 + 输入规范 + 结果反馈。

## 版式说明

整屏单列：顶部品牌区（Logo + 一句欢迎），中部登录表单，第三方登录在分隔线下方，协议勾选贴表单底部；登录成功用 Toast 回执并跳转首页，失败在字段下方报错，不弹 Toast。

## 引用的组件提示词

- `login-form-prompt` v1.0.0
- `text-field-prompt` v1.0.0
- `toast-prompt` v1.0.0，覆盖参数：{{position}} = 顶部居中

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
