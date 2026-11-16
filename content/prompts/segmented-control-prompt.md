---
id: "segmented-control-prompt"
kind: "prompt"
type: "prompt"
name_zh: "分段控制 / 标签页 · 提示词"
name_en: "Segmented Control & Tabs Prompt"
summary_zh: "生成「分段控制 / 标签页」的填空式提示词"
description: "Fill-in prompt that generates a Segmented Control & Tabs component"
keywords: ["prompt","component","segmented-control"]
platforms: ["all"]
function: "navigation"
placements: ["content-area","top-nav"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "segmented-control"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{segments}}","type":"text","default":"全部、进行中、已完成","range":"2–5 段","unit":""},{"name":"{{style}}","type":"enum","default":"药丸","range":"药丸 / 下划线","unit":""},{"name":"{{ink-animation}}","type":"enum","default":"滑动","range":"滑动 / 直接切换","unit":""}]
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

为我生成一个「分段控制 / 标签页」组件。用途：同屏切换内容分组的小控件：像药丸的是分段控制，带下划线的是标签页。使用场景：同页内容有 2–5 个明确分组、且切换频繁时用它，比下拉快、比跳页轻。

## 效果描述 Description

分段控制把 2–5 个互斥的视图或筛选钉在一个小控件里，点哪段看哪段，不用跳页。药丸式适合筛选与视图切换，下划线标签页适合内容分区，常配一条会滑动的墨条指示当前段。

细节要求：
- 每段文字长度尽量接近，太长的一段会把控件撑变形
- 当前段必须同时有颜色和字重变化，不能只靠一条下划线（色盲用户看不见）
- 切换时内容区高度跳变会晃页面，能预留高度就预留

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{segments}} | text | 全部、进行中、已完成 | 2–5 段 |
| {{style}} | enum | 药丸 | 药丸 / 下划线 |
| {{ink-animation}} | enum | 滑动 | 滑动 / 直接切换 |

## 约束 Constraints

- 不要这样做：分组超过 5 个（用标签页加滚动或下拉）、或分组之间没有关系（那是导航问题）时别用。

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
