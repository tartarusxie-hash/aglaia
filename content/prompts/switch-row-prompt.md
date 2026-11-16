---
id: "switch-row-prompt"
kind: "prompt"
type: "prompt"
name_zh: "开关行 · 提示词"
name_en: "Switch Row Prompt"
summary_zh: "生成「开关行」的填空式提示词"
description: "Fill-in prompt that generates a Switch Row component"
keywords: ["prompt","component","switch-row"]
platforms: ["all"]
function: "form"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "switch-row"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{description}}","type":"enum","default":"带一行副文案","range":"有 / 无","unit":""},{"name":"{{default-state}}","type":"enum","default":"开","range":"开 / 关","unit":""},{"name":"{{confirm-when-off}}","type":"enum","default":"重要项关闭需确认","range":"需要 / 不需要","unit":""}]
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

为我生成一个「开关行」组件。用途：左边一行字、右边一个开关的设置行：点一下立刻生效，不需要保存按钮。使用场景：设置项是明确的开/关二值、且切换无副作用或副作用可即时撤销时。

## 效果描述 Description

开关行是二值设置的标准形态：标题说清控制什么，副文案解释开/关的后果，开关即时生效。关掉重要功能（如备份、安全）时要二次确认或给出影响说明。

细节要求：
- 点整行都能切换，开关本体只是视觉指示
- 禁用态开关要连同标题一起置灰，并说明为什么不可用
- 开关颜色只用一套语义：开=主色，别有的绿有的蓝

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{description}} | enum | 带一行副文案 | 有 / 无 |
| {{default-state}} | enum | 开 | 开 / 关 |
| {{confirm-when-off}} | enum | 重要项关闭需确认 | 需要 / 不需要 |

## 约束 Constraints

- 不要这样做：选项不是二值（低/中/高）时别用开关凑合，用分段控制；需要生效延迟的（重启后生效）要在副文案写明。

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
