---
id: "fx-entrance-motion"
kind: "prompt"
type: "prompt"
name_zh: "入场动效 · 提示词"
name_en: "Entrance Motion Prompt"
summary_zh: "生成「入场动效」效果的填空式提示词"
description: "Fill-in prompt that generates the Entrance Motion effect"
keywords: ["prompt","effect","entrance-motion"]
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
effect: "entrance-motion"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{easing}}","type":"enum","default":"ease-out-expo","range":"ease-out-expo / ease-out-back / ease-in-out / linear","unit":""},{"name":"{{duration}}","type":"length","default":"600","range":"200–1200","unit":"ms"},{"name":"{{stagger}}","type":"length","default":"90","range":"0–200","unit":"ms"},{"name":"{{direction}}","type":"enum","default":"up","range":"up / down / left / right","unit":""}]
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

实现一个「入场动效」效果：一组元素逐个淡入上浮，像排队进场。它将用在 【页面/组件位置，如：定价卡、首屏背景、加载占位】，出现条件为 【默认呈现 / 悬停时 / 加载中，三选一】。不适配的场景先向我说明，不要硬套。

## 效果描述 Description

每个元素从「透明 + 偏移 20 多像素」动到原位，相邻元素延迟几十毫秒，就成了队列感。曲线选 ease-out-expo 最稳妥：快起慢停，眼睛觉得利落。延迟别超过每个 120ms、总数别超过 8 个，否则用户会觉得页面在「表演」而不是在「响应」。

## 设计 Tokens

颜色只用本站中性灰阶令牌（或替换为我的品牌色变量）：{{token:color/ink/primary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；动效时长与曲线 {{token:motion/duration/normal}}、{{token:motion/easing/ease-out-expo}}。本效果参数：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{easing}} | enum | ease-out-expo | ease-out-expo / ease-out-back / ease-in-out / linear |
| {{duration}} | length | 600 | 200–1200 |
| {{stagger}} | length | 90 | 0–200 |
| {{direction}} | enum | up | up / down / left / right |

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
