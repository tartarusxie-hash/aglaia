---
id: "text-field-prompt"
kind: "prompt"
type: "prompt"
name_zh: "文本输入框 · 提示词"
name_en: "Text Field Prompt"
summary_zh: "生成「文本输入框」的填空式提示词"
description: "Fill-in prompt that generates a Text Field component"
keywords: ["prompt","component","text-field"]
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
entry: "text-field"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{label-style}}","type":"enum","default":"上方标签","range":"上方 / 浮动 / 行内","unit":""},{"name":"{{helper}}","type":"enum","default":"下方提示文案","range":"有 / 无","unit":""},{"name":"{{clear-btn}}","type":"enum","default":"有清除按钮","range":"有 / 无","unit":""}]
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

为我生成一个「文本输入框」组件。用途：填字的框：上面是标签，下面是输入区，有提示、有报错，是表单的最小单位。使用场景：一切需要用户打字的地方——它是表单出现频率最高的控件。

## 效果描述 Description

文本输入框由标签、输入区、辅助文案三段构成：标签永远可见（别只用占位符当标签），出错时边框变色并在下方给出具体修改建议。带清除按钮、字数计数、密码可见切换都是常见配件。

细节要求：
- 标签、占位符、已输入文字三者字号要有层级，别一样大
- 错误信息出现时不引发布局大幅跳动（预留下方一行高度）
- 移动端输入时自动调对键盘类型，桌面端回车有明确行为

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{label-style}} | enum | 上方标签 | 上方 / 浮动 / 行内 |
| {{helper}} | enum | 下方提示文案 | 有 / 无 |
| {{clear-btn}} | enum | 有清除按钮 | 有 / 无 |

## 约束 Constraints

- 不要这样做：选项有限（<7）的输入别用文本框让人打字，用选择器或单选，出错率立刻降下来。

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
