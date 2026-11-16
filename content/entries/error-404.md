---
id: "error-404"
kind: "entry"
type: "component"
name_zh: "404 错误页"
name_en: "404 Error Page"
summary_zh: "走错路时看到的那页：一个大大的 404、一句人话、两个按钮（回首页、去搜索）。"
description: "The page for a wrong turn: a big 404, one line of human explanation, and buttons back home or to search."
keywords: ["404 error page","component","feedback"]
platforms: ["web"]
function: "feedback"
placements: ["full-screen"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "errors"
prompts: ["error-404-prompt"]
effects: []
resources: ["astrowind","astro-paper"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

404 页的任务是把走错路的人送回正道：先承认「这一页不存在」（别甩锅用户），再给两条最可能的路——回首页、去搜索，进阶一点给热门内容链接。它是错误页家族的代表：说人话、给原因、给出路。

## 什么时候用

任何网站都要预备它；同理还有 500、维护页、无权限页，结构同源。

## 什么时候不用

应用内的局部加载失败别整页 404，那是行内重试组件的位置。

## 细节与变体

- 别把锅甩给用户（「你访问的页面」不如「这一页搬走了」中性）
- 幽默可以有，但出路按钮必须比段子显眼
- 记日志：高频 404 地址是导航或外链坏掉的信号
