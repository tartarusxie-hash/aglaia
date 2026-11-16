---
id: "settings-list"
kind: "entry"
type: "component"
name_zh: "设置列表"
name_en: "Settings List"
summary_zh: "一屏开关和选项的集合：分组排列，每行左边是名字、右边是开关、箭头或当前值。"
description: "A grouped list of options: each row has a name on the left and a switch, chevron, or current value on the right."
keywords: ["settings list","component","personal"]
platforms: ["all"]
function: "personal"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "settings"
prompts: ["settings-list-prompt"]
effects: ["custom-toggle","custom-checkbox"]
resources: ["ant-design","tdesign","shadcn-admin"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

设置列表用分组列表承载所有低频选项：同类放一组，组间留白；行右侧按类型放开关（即时生效）、箭头（进二级页）或当前值（点开选择）。退出登录与注销账号沉到最后、标红，与其他行隔开。

## 什么时候用

选项超过 6 个、且大多低频时统一收进设置页——它就是为「找得到但别碍事」而生的。

## 什么时候不用

高频功能（每天用的开关）别埋进设置三级页；付费与安全类选项要另做确认，不要和普通开关混排误触。

## 细节与变体

- 开关行点整行都能切换，不只点那个小开关（费茨定律）
- 带箭头的行必须真的能进二级页，别用箭头装饰开关行
- 注销账号与退出登录分开：前者要二次确认，后者一次点击

配套效果见下方「可用效果」。
