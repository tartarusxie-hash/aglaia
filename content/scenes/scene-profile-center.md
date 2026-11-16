---
id: "scene-profile-center"
kind: "scene"
type: "prompt"
name_zh: "个人中心"
name_en: "Profile Center"
summary_zh: "「我的」整页：头部资料、通知入口与设置列表的标准组合。"
description: "The full Me page: profile header, notification entry, and settings list."
keywords: ["scene","prompt","personal"]
platforms: ["ios","android","harmonyos","web"]
function: "personal"
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
refs: [{"prompt":"profile-header-prompt","version":"1.0.0","overrides":{}},{"prompt":"settings-list-prompt","version":"1.0.0","overrides":{}},{"prompt":"notification-list-prompt","version":"1.0.0","overrides":{}}]
entries: ["profile-header","notification-list","settings-list"]
layout_zh: "单列滚动：头部（头像/昵称/数据行）→ 订单与资产快捷入口一行 → 设置分组列表；通知入口在头部右上角带角标，通知列表为独立页。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

「我的」整页：头部资料、通知入口与设置列表的标准组合。

## 版式说明

单列滚动：头部（头像/昵称/数据行）→ 订单与资产快捷入口一行 → 设置分组列表；通知入口在头部右上角带角标，通知列表为独立页。

## 引用的组件提示词

- `profile-header-prompt` v1.0.0
- `settings-list-prompt` v1.0.0
- `notification-list-prompt` v1.0.0

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
