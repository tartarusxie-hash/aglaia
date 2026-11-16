---
id: "harmonyos-list-prompt"
kind: "prompt"
type: "prompt"
name_zh: "鸿蒙分组列表（自绘示意） · 提示词"
name_en: "HarmonyOS List (Schematic) Prompt"
summary_zh: "生成「鸿蒙分组列表（自绘示意）」的填空式提示词"
description: "Fill-in prompt that generates a HarmonyOS List (Schematic) component"
keywords: ["prompt","component","harmonyos-list"]
platforms: ["harmonyos"]
function: "content"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "harmonyos-list"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{group-style}}","type":"enum","default":"卡片式分组","range":"卡片式 / 通栏式","unit":""},{"name":"{{row-height}}","type":"length","default":"56","range":"48–64","unit":"px"},{"name":"{{trailing}}","type":"enum","default":"箭头/开关/值","range":"配件类型","unit":""}]
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

为我生成一个「鸿蒙分组列表（自绘示意）」组件。用途：鸿蒙设置与内容页的分组列表：按华为设计规范要点自绘示意，非官方素材。使用场景：开发 HarmonyOS 应用的设置页、个人中心、内容列表时参考结构与要点。

## 效果描述 Description

本条目为自绘示意 + 规范要点（鸿蒙官方资源未获书面许可，本站不打包）：鸿蒙列表常用「卡片式分组」——每组是一个圆角卡片悬浮在浅色背景上，行间以细分隔线区隔；行结构与通用列表行一致（左配件 + 主副文案 + 右配件）。实现以 ArkUI 的 List/ListItem 与官方组件文档为准。

细节要求：
- 示意图为本站自绘，仅表达结构与比例
- 卡片式分组的组间距明显大于行间距，这是与通栏列表最大的观感差异
- 左滑操作、吸顶组头等行为以 ArkUI 组件能力为准，示意不承诺实现细节

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{group-style}} | enum | 卡片式分组 | 卡片式 / 通栏式 |
| {{row-height}} | length | 56 | 48–64 |
| {{trailing}} | enum | 箭头/开关/值 | 配件类型 |

## 约束 Constraints

- 不要这样做：不要把本示意当官方设计文件；具体尺寸与组件行为以华为官方文档为准。

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
