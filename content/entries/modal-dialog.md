---
id: "modal-dialog"
kind: "entry"
type: "component"
name_zh: "对话框（弹窗）"
name_en: "Modal Dialog"
summary_zh: "屏幕中间弹出的那个框：背景变暗，只能先处理它——确认删除、填写小表单都靠它。"
description: "A box that appears center-screen over a dimmed backdrop: confirm a deletion, fill a small form, decide now."
keywords: ["modal dialog","component","overlay"]
platforms: ["all"]
function: "overlay"
placements: ["overlay"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "modals-overlays"
prompts: ["modal-dialog-prompt"]
effects: ["entrance-motion"]
resources: ["radix-ui","shadcn-ui","chakra-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

对话框用「打断」换取注意力：遮罩压暗背景，焦点锁在框内，逼用户先做完这一个决定。标题说清要决定什么，正文给后果，主按钮放右且用危险色标危险动作。

## 什么时候用

不可逆操作确认、必须先完成的短表单、关键信息的一次性告知。

## 什么时候不用

内容超过一屏、或需要查阅背景页面信息时别用弹窗——用户被锁在框里看不到外面，应该用新页面或抽屉。

## 细节与变体

- 弹窗最多套一层，弹窗里再弹弹窗是设计事故
- 键盘 Esc 能关、焦点进来先落在最安全的按钮上（取消而非确认删除）
- 主按钮文案写具体动作（删除这篇文章），不要写「确定」

配套效果见下方「可用效果」。
