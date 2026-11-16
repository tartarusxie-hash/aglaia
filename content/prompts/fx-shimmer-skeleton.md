---
id: "fx-shimmer-skeleton"
kind: "prompt"
type: "prompt"
name_zh: "骨架屏微光 · 提示词"
name_en: "Shimmer Skeleton Prompt"
summary_zh: "生成「骨架屏微光」效果的填空式提示词"
description: "Fill-in prompt that generates the Shimmer Skeleton effect"
keywords: ["prompt","effect","shimmer-skeleton"]
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
effect: "shimmer-skeleton"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{speed}}","type":"length","default":"1.6","range":"0.8–3","unit":"s"},{"name":"{{sheen-width}}","type":"percent","default":"40","range":"20–80","unit":"%"},{"name":"{{radius}}","type":"length","default":"8","range":"0–16","unit":"px"}]
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

实现一个「骨架屏微光」效果：数据没到之前，用灰块占位，一道微光循环扫过。它将用在 【页面/组件位置，如：定价卡、首屏背景、加载占位】，出现条件为 【默认呈现 / 悬停时 / 加载中，三选一】。不适配的场景先向我说明，不要硬套。

## 效果描述 Description

骨架块就是和真实内容同尺寸的灰色圆角块；微光是一条斜向的白色渐变伪元素，从左扫到右无限循环。骨架的价值在布局稳定：内容到了不跳版。它只适合「结构已知、内容未知」的加载，超过 1 秒还没数据就该考虑空状态或错误提示了。

## 设计 Tokens

颜色只用本站中性灰阶令牌（或替换为我的品牌色变量）：{{token:color/ink/primary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；动效时长与曲线 {{token:motion/duration/normal}}、{{token:motion/easing/ease-out-expo}}。本效果参数：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{speed}} | length | 1.6 | 0.8–3 |
| {{sheen-width}} | percent | 40 | 20–80 |
| {{radius}} | length | 8 | 0–16 |

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
