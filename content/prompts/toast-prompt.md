---
id: "toast-prompt"
kind: "prompt"
type: "prompt"
name_zh: "轻提示 Toast · 提示词"
name_en: "Toast Prompt"
summary_zh: "生成「轻提示 Toast」的填空式提示词"
description: "Fill-in prompt that generates a Toast component"
keywords: ["prompt","component","toast"]
platforms: ["all"]
function: "feedback"
placements: ["floating","overlay"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "toast"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{position}}","type":"enum","default":"底部居中","range":"顶部 / 底部居中","unit":""},{"name":"{{duration}}","type":"length","default":"2500","range":"1500–4000","unit":"ms"},{"name":"{{with-action}}","type":"enum","default":"带撤销","range":"带操作 / 纯提示","unit":""}]
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

为我生成一个「轻提示 Toast」组件。用途：屏幕边上飘一下就消失的小条：「已保存」「复制成功」——不打断你手上的事。使用场景：操作成功、状态变更、后台任务完成的即时回执。

## 效果描述 Description

Toast 是最低打扰级别的反馈：出现在屏幕边缘，2–4 秒自动消失，不需要用户点确认。适合成功确认和可撤销操作的回执（删除后给 5 秒撤销），不适合需要用户做决定的事。

细节要求：
- 文案说结果不说过程：「已保存」而不是「保存成功啦！」再加个感叹号阵列
- 同类 Toast 连续触发要合并或替换，别叠罗汉挡住内容
- 带操作的 Toast（撤销）停留时间要给足 4 秒以上

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{position}} | enum | 底部居中 | 顶部 / 底部居中 |
| {{duration}} | length | 2500 | 1500–4000 |
| {{with-action}} | enum | 带撤销 | 带操作 / 纯提示 |

## 约束 Constraints

- 不要这样做：报错需要用户处理、或信息必须被读完时别用 Toast（一飘就没，用户还没看清就消失了）——那是横幅和弹窗的活。

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
