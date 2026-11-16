---
id: "harmonyos-tabs-prompt"
kind: "prompt"
type: "prompt"
name_zh: "鸿蒙底部标签栏（自绘示意） · 提示词"
name_en: "HarmonyOS Bottom Tabs (Schematic) Prompt"
summary_zh: "生成「鸿蒙底部标签栏（自绘示意）」的填空式提示词"
description: "Fill-in prompt that generates a HarmonyOS Bottom Tabs (Schematic) component"
keywords: ["prompt","component","harmonyos-tabs"]
platforms: ["harmonyos"]
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
entry: "harmonyos-tabs"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{tab-count}}","type":"enum","default":"4","range":"3–5","unit":""},{"name":"{{style-note}}","type":"text","default":"按规范要点自绘","range":"示意说明","unit":""},{"name":"{{safe-area}}","type":"enum","default":"适配手势条","range":"适配","unit":""}]
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

为我生成一个「鸿蒙底部标签栏（自绘示意）」组件。用途：鸿蒙 App 的底部主导航：按华为设计规范的要点自绘示意，非官方素材。使用场景：开发 HarmonyOS NEXT 应用、需要底部主导航时参考其规范要点与本站自绘示意。

## 效果描述 Description

本条目为自绘示意 + 规范要点（鸿蒙官方资源未获书面许可，本站不打包）：结构与通用底部标签栏同源——3–5 个一级入口、图标加文字、选中态高亮；差异在规范细节：标签栏与系统手势条的安全距离、图标的线性风格与字重、以及与鸿蒙多设备（手机/折叠屏/平板）形态的适配要点，实现以 ArkUI 的 Tabs 组件为准。

细节要求：
- 示意图为本站自绘，仅表达结构与比例，不是华为官方设计稿
- 选中态用主色填充图标 + 加粗文字，与未选中态的线性图标拉开层级
- 折叠屏与平板形态下标签栏可考虑迁到侧边，规范要点见鸿蒙设计指南（仅参考外链）

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{tab-count}} | enum | 4 | 3–5 |
| {{style-note}} | text | 按规范要点自绘 | 示意说明 |
| {{safe-area}} | enum | 适配手势条 | 适配 |

## 约束 Constraints

- 不要这样做：不要把本示意当官方设计文件使用；正式产品请以华为开发者官网最新规范与 ArkUI 组件为准。

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
