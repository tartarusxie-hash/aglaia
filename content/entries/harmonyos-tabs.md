---
id: "harmonyos-tabs"
kind: "entry"
type: "component"
name_zh: "鸿蒙底部标签栏（自绘示意）"
name_en: "HarmonyOS Bottom Tabs (Schematic)"
summary_zh: "鸿蒙 App 的底部主导航：按华为设计规范的要点自绘示意，非官方素材。"
description: "The bottom primary navigation for HarmonyOS apps — a self-drawn schematic following Huawei's published design guidelines; no official assets."
keywords: ["harmonyos bottom tabs schematic","component","navigation"]
platforms: ["harmonyos"]
function: "navigation"
placements: ["bottom-tab"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "bottom-tab-bar"
prompts: ["harmonyos-tabs-prompt"]
effects: []
resources: ["arkui","harmonyos-design"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

本条目为自绘示意 + 规范要点（鸿蒙官方资源未获书面许可，本站不打包）：结构与通用底部标签栏同源——3–5 个一级入口、图标加文字、选中态高亮；差异在规范细节：标签栏与系统手势条的安全距离、图标的线性风格与字重、以及与鸿蒙多设备（手机/折叠屏/平板）形态的适配要点，实现以 ArkUI 的 Tabs 组件为准。

## 什么时候用

开发 HarmonyOS NEXT 应用、需要底部主导航时参考其规范要点与本站自绘示意。

## 什么时候不用

不要把本示意当官方设计文件使用；正式产品请以华为开发者官网最新规范与 ArkUI 组件为准。

## 细节与变体

- 示意图为本站自绘，仅表达结构与比例，不是华为官方设计稿
- 选中态用主色填充图标 + 加粗文字，与未选中态的线性图标拉开层级
- 折叠屏与平板形态下标签栏可考虑迁到侧边，规范要点见鸿蒙设计指南（仅参考外链）
