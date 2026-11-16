---
id: "scene-onboarding-flow"
kind: "scene"
type: "prompt"
name_zh: "新手引导流程"
name_en: "Onboarding Flow"
summary_zh: "首启三屏引导 + 登录的完整首访路径，讲完价值再要账号。"
description: "First-run path: three onboarding screens into sign-in — value first, account second."
keywords: ["scene","prompt","onboarding"]
platforms: ["ios","android","harmonyos"]
function: "onboarding"
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
refs: [{"prompt":"onboarding-carousel-prompt","version":"1.0.0","overrides":{}},{"prompt":"login-form-prompt","version":"1.0.0","overrides":{"{{methods}}":"验证码 + 第三方"}}]
entries: ["onboarding-carousel","login-form"]
layout_zh: "全屏轮播 3 屏（可跳过）→ 最后一屏按钮进登录页；登录成功直达首页，引导只在首启出现一次，版本号变更时可重现。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

首启三屏引导 + 登录的完整首访路径，讲完价值再要账号。

## 版式说明

全屏轮播 3 屏（可跳过）→ 最后一屏按钮进登录页；登录成功直达首页，引导只在首启出现一次，版本号变更时可重现。

## 引用的组件提示词

- `onboarding-carousel-prompt` v1.0.0
- `login-form-prompt` v1.0.0，覆盖参数：{{methods}} = 验证码 + 第三方

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
