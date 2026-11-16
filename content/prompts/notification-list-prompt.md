---
id: "notification-list-prompt"
kind: "prompt"
type: "prompt"
name_zh: "通知列表 · 提示词"
name_en: "Notification List Prompt"
summary_zh: "生成「通知列表」的填空式提示词"
description: "Fill-in prompt that generates a Notification List component"
keywords: ["prompt","component","notification-list"]
platforms: ["all"]
function: "personal"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "notification-list"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{unread-style}}","type":"enum","default":"红点 + 加粗","range":"红点 / 数字角标 / 仅加粗","unit":""},{"name":"{{time-format}}","type":"enum","default":"相对时间","range":"相对时间 / 绝对日期","unit":""},{"name":"{{group-by-type}}","type":"enum","default":"按类型分组","range":"分组 / 混排","unit":""}]
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 角色 Role

你是一名资深产品设计师兼前端工程师，深谙移动与 Web 界面规范，输出的设计克制、标准、可直接开发。

## 任务 Task

为我生成一个「通知列表」组件。用途：消息中心的那一列：谁在什么时候发了什么，未读的有红点，看完能一键全标已读。使用场景：产品有系统消息、互动消息需要归档查看时；纯聊天产品用会话列表，不是它。

## 效果描述 Description

通知列表按时间倒序排所有系统消息：每行图标区分类型，标题一行、正文一行省略，未读行加粗带红点。顶部给「全部已读」，重要的通知（待处理事项）和广播通知最好分开两组。

细节要求：
- 红点只表示「没看过」，处理完待办要用待办自己的状态，别和未读混用
- 时间显示相对时间（3 分钟前），超过一周切绝对日期
- 空状态要说明「有新消息会放这里」，配一个安静的插画

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{unread-style}} | enum | 红点 + 加粗 | 红点 / 数字角标 / 仅加粗 |
| {{time-format}} | enum | 相对时间 | 相对时间 / 绝对日期 |
| {{group-by-type}} | enum | 按类型分组 | 分组 / 混排 |

## 约束 Constraints

- 不要这样做：只有两三种通知且总量很少时，一页列表足矣，别提前做分组和筛选的复杂度。

- 触控目标至少 44×44（Web 鼠标场景至少 24px），正文不小于 14px；
- 颜色对比满足 WCAG AA（正文 ≥4.5:1）；状态不能只靠颜色区分；
- 文案用我给的真实内容占位：【在此粘贴真实文案，如标题、按钮字】，不要用 Lorem ipsum；
- 只实现这一个组件，不要顺带生成整页或其他组件。

## 框架目标 Target

【html-css / tailwind / react，三选一，默认 html-css】

## 输出格式 Output

输出完整可运行代码，并逐项自检：

- [ ] 结构与「效果描述」一致，参数与参数表一致；
- [ ] 包含默认 / 悬停 / 按下 / 禁用等必要状态；
- [ ] 键盘可达，焦点样式可见；
- [ ] 在 375px 宽移动屏与 1440px 桌面屏下都不溢出、不重叠。

（验证状态：待复验。本条提示词尚未经真实模型实测，验证字段如实留空。）
