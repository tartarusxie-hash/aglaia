---
id: "scene-settings-page"
kind: "scene"
type: "prompt"
name_zh: "设置页"
name_en: "Settings Page"
summary_zh: "完整设置页：分组列表与开关行的组合，含危险区。"
description: "A complete settings page: grouped lists and switch rows, with a danger zone."
keywords: ["scene","prompt","personal"]
platforms: ["all"]
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
refs: [{"prompt":"settings-list-prompt","version":"1.0.0","overrides":{}},{"prompt":"switch-row-prompt","version":"1.0.0","overrides":{}},{"prompt":"list-item-prompt","version":"1.0.0","overrides":{}}]
entries: ["settings-list","switch-row","list-item"]
layout_zh: "单列分组：账号组（列表行进二级页）、通知组（开关行即时生效）、通用组、关于组；退出登录与注销账号沉底分开放置，注销红色并二次确认。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

完整设置页：分组列表与开关行的组合，含危险区。

## 版式说明

单列分组：账号组（列表行进二级页）、通知组（开关行即时生效）、通用组、关于组；退出登录与注销账号沉底分开放置，注销红色并二次确认。

## 引用的组件提示词

- `settings-list-prompt` v1.0.0
- `switch-row-prompt` v1.0.0
- `list-item-prompt` v1.0.0

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
