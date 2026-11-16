---
id: "bottom-sheet-prompt"
kind: "prompt"
type: "prompt"
name_zh: "底部弹层 · 提示词"
name_en: "Bottom Sheet Prompt"
summary_zh: "生成「底部弹层」的填空式提示词"
description: "Fill-in prompt that generates a Bottom Sheet component"
keywords: ["prompt","component","bottom-sheet"]
platforms: ["ios","android","harmonyos","web-mobile"]
function: "overlay"
placements: ["bottom-sheet"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "bottom-sheet"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{height}}","type":"enum","default":"自适应（≤70%）","range":"半屏 / 自适应 / 近全屏","unit":""},{"name":"{{drag-handle}}","type":"enum","default":"有拖拽条","range":"有 / 无","unit":""},{"name":"{{expandable}}","type":"enum","default":"可上拉展开","range":"可 / 不可","unit":""}]
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

为我生成一个「底部弹层」组件。用途：从屏幕底部升起来的半屏面板：分享、筛选、选规格——拇指够得着，还能下拉关掉。使用场景：移动端的分享、筛选、选择器、商品规格、操作菜单——需要上下文又需要空间时。

## 效果描述 Description

底部弹层是移动端的浮层主力：从底部升起，顶部有拖拽条暗示可以拉动，下拉或点遮罩关闭。它比居中弹窗更顺手（拇指区），又比全屏页更轻（背景还看得见上下文）。

细节要求：
- 高度超过 70% 就该考虑全屏页，弹层里再滚动长列表体验很差
- 打开时背景页要锁定滚动，否则两层一起滚
- 拖拽条只是提示，关闭按钮或手势要真实可发现

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{height}} | enum | 自适应（≤70%） | 半屏 / 自适应 / 近全屏 |
| {{drag-handle}} | enum | 有拖拽条 | 有 / 无 |
| {{expandable}} | enum | 可上拉展开 | 可 / 不可 |

## 约束 Constraints

- 不要这样做：内容需要长时间编辑（写长文）时别用弹层，空间和键盘都会打架，去全屏页。

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
