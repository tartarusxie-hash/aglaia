---
id: "notification-list"
kind: "entry"
type: "component"
name_zh: "通知列表"
name_en: "Notification List"
summary_zh: "消息中心的那一列：谁在什么时候发了什么，未读的有红点，看完能一键全标已读。"
description: "The message center list: who sent what and when, red dots for unread, mark-all-read at hand."
keywords: ["notification list","component","personal"]
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
pattern: "messages"
prompts: ["notification-list-prompt"]
effects: ["pulsing-badge"]
resources: ["ant-design","shadcn-admin"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

通知列表按时间倒序排所有系统消息：每行图标区分类型，标题一行、正文一行省略，未读行加粗带红点。顶部给「全部已读」，重要的通知（待处理事项）和广播通知最好分开两组。

## 什么时候用

产品有系统消息、互动消息需要归档查看时；纯聊天产品用会话列表，不是它。

## 什么时候不用

只有两三种通知且总量很少时，一页列表足矣，别提前做分组和筛选的复杂度。

## 细节与变体

- 红点只表示「没看过」，处理完待办要用待办自己的状态，别和未读混用
- 时间显示相对时间（3 分钟前），超过一周切绝对日期
- 空状态要说明「有新消息会放这里」，配一个安静的插画

配套效果见下方「可用效果」。
