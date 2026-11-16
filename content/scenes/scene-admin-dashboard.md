---
id: "scene-admin-dashboard"
kind: "scene"
type: "prompt"
name_zh: "后台仪表盘"
name_en: "Admin Dashboard"
summary_zh: "管理后台首页：侧边导航 + 指标卡组 + 数据表格的经典三件套。"
description: "The admin home trio: sidebar navigation, stat cards, and a data table."
keywords: ["scene","prompt","data"]
platforms: ["web","desktop"]
function: "data"
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
refs: [{"prompt":"drawer-nav-prompt","version":"1.0.0","overrides":{}},{"prompt":"dashboard-cards-prompt","version":"1.0.0","overrides":{}},{"prompt":"data-table-prompt","version":"1.0.0","overrides":{}},{"prompt":"top-app-bar-prompt","version":"1.0.0","overrides":{}}]
entries: ["drawer-nav","dashboard-cards","data-table","top-app-bar"]
layout_zh: "左导航常驻（可折叠），右区顶部应用栏（标题 + 搜索 + 账号），内容区第一行 4 张指标卡，第二行数据表格占满剩余高度，表格底部分页。"
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 场景说明

管理后台首页：侧边导航 + 指标卡组 + 数据表格的经典三件套。

## 版式说明

左导航常驻（可折叠），右区顶部应用栏（标题 + 搜索 + 账号），内容区第一行 4 张指标卡，第二行数据表格占满剩余高度，表格底部分页。

## 引用的组件提示词

- `drawer-nav-prompt` v1.0.0
- `dashboard-cards-prompt` v1.0.0
- `data-table-prompt` v1.0.0
- `top-app-bar-prompt` v1.0.0

## 生成顺序

先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。

（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）
