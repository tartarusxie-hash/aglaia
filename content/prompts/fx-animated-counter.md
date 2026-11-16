---
id: "fx-animated-counter"
kind: "prompt"
type: "prompt"
name_zh: "数字滚动计数 · 提示词"
name_en: "Animated Counter Prompt"
summary_zh: "生成「数字滚动计数」效果的填空式提示词"
description: "Fill-in prompt that generates the Animated Counter effect"
keywords: ["prompt","effect","animated-counter"]
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
effect: "animated-counter"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{target}}","type":"length","default":"12800","range":"100–99999","unit":""},{"name":"{{duration}}","type":"length","default":"1600","range":"400–3000","unit":"ms"},{"name":"{{easing}}","type":"enum","default":"out","range":"out / inout","unit":""}]
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

实现一个「数字滚动计数」效果：数字从 0 滚到目标值，先快后慢稳稳停住。它将用在 【页面/组件位置，如：定价卡、首屏背景、加载占位】，出现条件为 【默认呈现 / 悬停时 / 加载中，三选一】。不适配的场景先向我说明，不要硬套。

## 效果描述 Description

用 requestAnimationFrame 按进度取缓动值，把「已过时间 ÷ 总时长」喂给 easeOutCubic 再乘目标值。数字字体记得开 tabular-nums（等宽数字），否则滚动时整行会左右抖。计数只用在「数字本身是主角」的统计场景，别给每个小数字都加。

## 设计 Tokens

颜色只用本站中性灰阶令牌（或替换为我的品牌色变量）：{{token:color/ink/primary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；动效时长与曲线 {{token:motion/duration/normal}}、{{token:motion/easing/ease-out-expo}}。本效果参数：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{target}} | length | 12800 | 100–99999 |
| {{duration}} | length | 1600 | 400–3000 |
| {{easing}} | enum | out | out / inout |

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
