---
id: "switch-row"
kind: "entry"
type: "component"
name_zh: "开关行"
name_en: "Switch Row"
summary_zh: "左边一行字、右边一个开关的设置行：点一下立刻生效，不需要保存按钮。"
description: "A settings row with text on the left and a switch on the right — changes apply instantly, no save button."
keywords: ["switch row","component","form"]
platforms: ["all"]
function: "form"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "forms"
prompts: ["switch-row-prompt"]
effects: ["custom-toggle"]
resources: ["ant-design","tdesign"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

开关行是二值设置的标准形态：标题说清控制什么，副文案解释开/关的后果，开关即时生效。关掉重要功能（如备份、安全）时要二次确认或给出影响说明。

## 什么时候用

设置项是明确的开/关二值、且切换无副作用或副作用可即时撤销时。

## 什么时候不用

选项不是二值（低/中/高）时别用开关凑合，用分段控制；需要生效延迟的（重启后生效）要在副文案写明。

## 细节与变体

- 点整行都能切换，开关本体只是视觉指示
- 禁用态开关要连同标题一起置灰，并说明为什么不可用
- 开关颜色只用一套语义：开=主色，别有的绿有的蓝

配套效果见下方「可用效果」。
