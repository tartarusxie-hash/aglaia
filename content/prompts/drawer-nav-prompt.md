---
id: "drawer-nav-prompt"
kind: "prompt"
type: "prompt"
name_zh: "侧边导航（抽屉/侧栏） · 提示词"
name_en: "Drawer / Sidebar Navigation Prompt"
summary_zh: "生成「侧边导航（抽屉/侧栏）」的填空式提示词"
description: "Fill-in prompt that generates a Drawer / Sidebar Navigation component"
keywords: ["prompt","component","drawer-nav"]
platforms: ["web","desktop","tablet"]
function: "navigation"
placements: ["sidebar-left"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "drawer-nav"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{width}}","type":"length","default":"260","range":"200–320","unit":"px"},{"name":"{{collapsible}}","type":"enum","default":"可折叠成图标条","range":"可折叠 / 不可折叠","unit":""},{"name":"{{group-count}}","type":"enum","default":"3","range":"1–6 组","unit":""}]
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

为我生成一个「侧边导航（抽屉/侧栏）」组件。用途：从左边滑出来或常驻左边的导航：一级、二级菜单都在里面，后台和复杂应用的主导航。使用场景：菜单项超过 8 个、或有两级以上层级时——后台、文档站、设置中心都是它的主场。

## 效果描述 Description

侧边导航把多层菜单收在一列：顶部放产品名或账号，菜单按组排列，当前项高亮，可折叠成只剩图标的窄条给内容腾地方。移动端同结构变为抽屉，从左侧滑出、用完滑走。

细节要求：
- 折叠态只留图标时，每个图标必须有气泡提示补文字
- 菜单分组之间留白或分隔线，组名小字大写或灰色
- 移动端抽屉打开时，背景要遮罩且点遮罩能关

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{width}} | length | 260 | 200–320 |
| {{collapsible}} | enum | 可折叠成图标条 | 可折叠 / 不可折叠 |
| {{group-count}} | enum | 3 | 1–6 组 |

## 约束 Constraints

- 不要这样做：一级入口只有三五个时别用它（顶部标签或底部标签更直接）；营销页也别上侧栏，会打断阅读。

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
