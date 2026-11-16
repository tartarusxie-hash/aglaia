---
id: "settings-list-prompt"
kind: "prompt"
type: "prompt"
name_zh: "设置列表 · 提示词"
name_en: "Settings List Prompt"
summary_zh: "生成「设置列表」的填空式提示词"
description: "Fill-in prompt that generates a Settings List component"
keywords: ["prompt","component","settings-list"]
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
entry: "settings-list"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{groups}}","type":"text","default":"账号、通知、通用、关于","range":"3–5 组","unit":""},{"name":"{{danger-zone}}","type":"enum","default":"末组红色退出/注销","range":"有 / 无","unit":""},{"name":"{{row-height}}","type":"length","default":"52","range":"48–60","unit":"px"}]
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

为我生成一个「设置列表」组件。用途：一屏开关和选项的集合：分组排列，每行左边是名字、右边是开关、箭头或当前值。使用场景：选项超过 6 个、且大多低频时统一收进设置页——它就是为「找得到但别碍事」而生的。

## 效果描述 Description

设置列表用分组列表承载所有低频选项：同类放一组，组间留白；行右侧按类型放开关（即时生效）、箭头（进二级页）或当前值（点开选择）。退出登录与注销账号沉到最后、标红，与其他行隔开。

细节要求：
- 开关行点整行都能切换，不只点那个小开关（费茨定律）
- 带箭头的行必须真的能进二级页，别用箭头装饰开关行
- 注销账号与退出登录分开：前者要二次确认，后者一次点击

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{groups}} | text | 账号、通知、通用、关于 | 3–5 组 |
| {{danger-zone}} | enum | 末组红色退出/注销 | 有 / 无 |
| {{row-height}} | length | 52 | 48–60 |

## 约束 Constraints

- 不要这样做：高频功能（每天用的开关）别埋进设置三级页；付费与安全类选项要另做确认，不要和普通开关混排误触。

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
