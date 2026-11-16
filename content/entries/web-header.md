---
id: "web-header"
kind: "entry"
type: "component"
name_zh: "网站页眉导航"
name_en: "Website Header"
summary_zh: "网站最上面那条横栏：Logo 在左，导航在中，登录/注册按钮在右，滚动时常吸顶。"
description: "The header of a website: logo left, nav in the middle, sign-in / sign-up actions right — often sticky."
keywords: ["website header","component","navigation"]
platforms: ["web"]
function: "navigation"
placements: ["top-nav"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "top-navigation"
prompts: ["web-header-prompt"]
effects: []
resources: ["shadcn-ui","astrowind","shadcn-landing-page"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

网站页眉是全站的门面与路标：Logo 锚定左上，主导航 4–6 项，右侧放登录与一个主行动按钮。页面往下滚时吸顶常驻，长页里随时能跳走或转化。

## 什么时候用

任何多页网站都需要；落地页可以简化为只有 Logo + CTA 的版本。

## 什么时候不用

单页应用内部的工作区别用页眉占高度（那是顶栏和侧栏的位置）；导航项超过 7 个要上二级菜单或重新分组。

## 细节与变体

- 主 CTA 只留一个且用实心按钮，其余链接用文字样式，层级一眼分明
- 移动端导航收进汉堡菜单，展开为全屏或抽屉列表
- 吸顶时加一条底部分隔线或轻阴影，和内容分开层次
