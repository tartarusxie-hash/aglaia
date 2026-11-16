---
id: "harmonyos-list"
kind: "entry"
type: "component"
name_zh: "鸿蒙分组列表（自绘示意）"
name_en: "HarmonyOS List (Schematic)"
summary_zh: "鸿蒙设置与内容页的分组列表：按华为设计规范要点自绘示意，非官方素材。"
description: "The grouped list used across HarmonyOS settings and content pages — self-drawn schematic from published guideline points; no official assets."
keywords: ["harmonyos list schematic","component","content"]
platforms: ["harmonyos"]
function: "content"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "list"
prompts: ["harmonyos-list-prompt"]
effects: []
resources: ["arkui","harmonyos-design"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

本条目为自绘示意 + 规范要点（鸿蒙官方资源未获书面许可，本站不打包）：鸿蒙列表常用「卡片式分组」——每组是一个圆角卡片悬浮在浅色背景上，行间以细分隔线区隔；行结构与通用列表行一致（左配件 + 主副文案 + 右配件）。实现以 ArkUI 的 List/ListItem 与官方组件文档为准。

## 什么时候用

开发 HarmonyOS 应用的设置页、个人中心、内容列表时参考结构与要点。

## 什么时候不用

不要把本示意当官方设计文件；具体尺寸与组件行为以华为官方文档为准。

## 细节与变体

- 示意图为本站自绘，仅表达结构与比例
- 卡片式分组的组间距明显大于行间距，这是与通栏列表最大的观感差异
- 左滑操作、吸顶组头等行为以 ArkUI 组件能力为准，示意不承诺实现细节
