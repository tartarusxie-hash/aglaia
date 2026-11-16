---
id: "modal-dialog-prompt"
kind: "prompt"
type: "prompt"
name_zh: "对话框（弹窗） · 提示词"
name_en: "Modal Dialog Prompt"
summary_zh: "生成「对话框（弹窗）」的填空式提示词"
description: "Fill-in prompt that generates a Modal Dialog component"
keywords: ["prompt","component","modal-dialog"]
platforms: ["all"]
function: "overlay"
placements: ["overlay"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "modal-dialog"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{size}}","type":"enum","default":"中（480px）","range":"小 / 中 / 大","unit":""},{"name":"{{dismissible}}","type":"enum","default":"点遮罩可关","range":"可关 / 必须选按钮","unit":""},{"name":"{{actions}}","type":"text","default":"取消 / 确认删除","range":"按钮组","unit":""}]
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

为我生成一个「对话框（弹窗）」组件。用途：屏幕中间弹出的那个框：背景变暗，只能先处理它——确认删除、填写小表单都靠它。使用场景：不可逆操作确认、必须先完成的短表单、关键信息的一次性告知。

## 效果描述 Description

对话框用「打断」换取注意力：遮罩压暗背景，焦点锁在框内，逼用户先做完这一个决定。标题说清要决定什么，正文给后果，主按钮放右且用危险色标危险动作。

细节要求：
- 弹窗最多套一层，弹窗里再弹弹窗是设计事故
- 键盘 Esc 能关、焦点进来先落在最安全的按钮上（取消而非确认删除）
- 主按钮文案写具体动作（删除这篇文章），不要写「确定」

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{size}} | enum | 中（480px） | 小 / 中 / 大 |
| {{dismissible}} | enum | 点遮罩可关 | 可关 / 必须选按钮 |
| {{actions}} | text | 取消 / 确认删除 | 按钮组 |

## 约束 Constraints

- 不要这样做：内容超过一屏、或需要查阅背景页面信息时别用弹窗——用户被锁在框里看不到外面，应该用新页面或抽屉。

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
