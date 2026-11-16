---
id: "text-field"
kind: "entry"
type: "component"
name_zh: "文本输入框"
name_en: "Text Field"
summary_zh: "填字的框：上面是标签，下面是输入区，有提示、有报错，是表单的最小单位。"
description: "The text input: a label above, the field below, hints and errors — the atom of every form."
keywords: ["text field","component","form"]
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
prompts: ["text-field-prompt"]
effects: ["focus-ring"]
resources: ["shadcn-ui","mui","chakra-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

文本输入框由标签、输入区、辅助文案三段构成：标签永远可见（别只用占位符当标签），出错时边框变色并在下方给出具体修改建议。带清除按钮、字数计数、密码可见切换都是常见配件。

## 什么时候用

一切需要用户打字的地方——它是表单出现频率最高的控件。

## 什么时候不用

选项有限（<7）的输入别用文本框让人打字，用选择器或单选，出错率立刻降下来。

## 细节与变体

- 标签、占位符、已输入文字三者字号要有层级，别一样大
- 错误信息出现时不引发布局大幅跳动（预留下方一行高度）
- 移动端输入时自动调对键盘类型，桌面端回车有明确行为

配套效果见下方「可用效果」。
