---
id: "mobile-tab-bar-prompt"
kind: "prompt"
type: "prompt"
name_zh: "底部标签栏（移动端） · 提示词"
name_en: "Bottom Tab Bar (Mobile) Prompt"
summary_zh: "生成「底部标签栏（移动端）」的填空式提示词"
description: "Fill-in prompt that generates a Bottom Tab Bar (Mobile) component"
keywords: ["prompt","component","mobile-tab-bar"]
platforms: ["ios","android","harmonyos","web-mobile"]
function: "navigation"
placements: ["bottom-tab"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "mobile-tab-bar"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{tab-count}}","type":"enum","default":"4","range":"3 / 4 / 5","unit":""},{"name":"{{bar-height}}","type":"length","default":"56","range":"48–64","unit":"px"},{"name":"{{icon-size}}","type":"length","default":"24","range":"20–28","unit":"px"},{"name":"{{show-badge}}","type":"enum","default":"是","range":"是 / 否","unit":""}]
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

为我生成一个「底部标签栏（移动端）」组件。用途：App 底部那排一级入口：图标在上、文字在下，3–5 个，拇指最容易够到。使用场景：App 有 3–5 个平级的一级功能，且用户会在它们之间频繁切换时——这是移动端的默认答案。

## 效果描述 Description

底部标签栏是 App 的主导航：把产品最重要的 3–5 个一级页面钉在屏幕底部，用户在任何一层都能一键切换。它由等宽的标签格组成，每格一个图标加一行小字，当前页的标签高亮，未读消息用角标提示。

细节要求：
- 标签文字不超过 4 个字，图标用同一套线性图标，未选中态只描边、选中态填充或加粗
- 角标只标数字或红点，超过 99 显示 99+；角标是「有新东西」，不是装饰
- 高度适配安全区（Home Indicator），背景可带顶部 1px 分隔线或轻微毛玻璃
- 鸿蒙与安卓常用同样的结构，iOS 习惯高度略矮、图标略大

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{tab-count}} | enum | 4 | 3 / 4 / 5 |
| {{bar-height}} | length | 56 | 48–64 |
| {{icon-size}} | length | 24 | 20–28 |
| {{show-badge}} | enum | 是 | 是 / 否 |

## 约束 Constraints

- 不要这样做：一级功能超过 5 个（该用分组或抽屉）、或只有 1–2 个页面（不需要导航栏）时不用；也别把「发布」这种动作伪装成标签混进去（要做就做中间凸起按钮并明确它是动作）。

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
