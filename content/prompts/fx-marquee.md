---
id: "fx-marquee"
kind: "prompt"
type: "prompt"
name_zh: "无缝跑马灯 · 提示词"
name_en: "Seamless Marquee Prompt"
summary_zh: "生成「无缝跑马灯」效果的填空式提示词"
description: "Fill-in prompt that generates the Seamless Marquee effect"
keywords: ["prompt","effect","marquee"]
platforms: ["all"]
function: "motion"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
effect: "marquee"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{duration}}","type":"length","default":"18","range":"5–40","unit":"s"},{"name":"{{gap}}","type":"length","default":"32","range":"8–64","unit":"px"},{"name":"{{direction}}","type":"enum","default":"left","range":"left / right","unit":""}]
verification:
  last_verified_model: ""
  last_verified_date: ""
  verified_by: ""
  result: ""
created: "2026-11-10"
updated: "2026-11-10"
---

## 角色 Role

你是一名资深前端工程师，擅长用最少的代码实现精致的界面效果。只用 CSS 与 Web Animations API，不引第三方动画库。

## 任务 Task

实现一个「无缝跑马灯」效果：一排内容匀速横滚，首尾相接看不出断点。它将用在 【页面/组件位置，如：定价卡、首屏背景、加载占位】，出现条件为 【默认呈现 / 悬停时 / 加载中，三选一】。不适配的场景先向我说明，不要硬套。

## 效果描述 Description

秘诀是内容复制两份并排，轨道动画平移 -50% 后瞬间归位——因为后半段和前半段长得一模一样，跳回去也看不出来。速度用「每份内容的宽度 ÷ 期望时长」算，别写死。鼠标悬停暂停是基本礼貌；重要信息不要只放在跑马灯里。

## 设计 Tokens

颜色只用本站中性灰阶令牌（或替换为我的品牌色变量）：{{token:color/ink/primary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；动效时长与曲线 {{token:motion/duration/normal}}、{{token:motion/easing/ease-out-expo}}。本效果参数：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{duration}} | length | 18 | 5–40 |
| {{gap}} | length | 32 | 8–64 |
| {{direction}} | enum | left | left / right |

## 约束 Constraints

- 动画只用 transform / opacity / filter，不引发布局抖动；
- 尊重 prefers-reduced-motion：用户要求减少动态时改为静态呈现；
- 悬停类效果同时支持键盘聚焦触发；纯装饰层加 aria-hidden；
- 静态默认态必须正确：动效默认静止，悬停才播放（本站页面效果卡片规则）。

## 框架目标 Target

【html-css / tailwind / react，三选一，默认 html-css】

## 输出格式 Output

输出完整可运行代码（单文件或组件），并逐项对照验收：

- [ ] 参数与上表一致，改参数能看出变化；
- [ ] 静态默认态正确，悬停播放、移开复位；
- [ ] prefers-reduced-motion 下不播放动效；
- [ ] 移动端（无悬停）有可用呈现或降级。

（验证状态：待复验。本条提示词尚未经真实模型实测，验证字段如实留空。）
