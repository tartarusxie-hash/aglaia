---
id: "skeleton-screen-prompt"
kind: "prompt"
type: "prompt"
name_zh: "骨架屏 · 提示词"
name_en: "Skeleton Screen Prompt"
summary_zh: "生成「骨架屏」的填空式提示词"
description: "Fill-in prompt that generates a Skeleton Screen component"
keywords: ["prompt","component","skeleton-screen"]
platforms: ["all"]
function: "feedback"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "skeleton-screen"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{layout}}","type":"enum","default":"列表","range":"列表 / 详情 / 卡片网格","unit":""},{"name":"{{shimmer}}","type":"enum","default":"微光扫过","range":"微光 / 呼吸 / 静态","unit":""},{"name":"{{max-wait}}","type":"enum","default":"超过 3 秒切空/错误态","range":"兜底策略","unit":""}]
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

为我生成一个「骨架屏」组件。用途：数据来之前先摆出的灰色轮廓：标题是灰条、图是灰块，一道微光扫过表示在加载。使用场景：结构已知、内容未知的加载场景：信息流、详情页、个人中心。

## 效果描述 Description

骨架屏用与真实内容同尺寸的灰块先占住版式，数据到了原地替换，页面不跳、不晃。它卖的是「已经在加载了」的确定感，比白屏和转圈都更让人愿意等。

细节要求：
- 骨架块尺寸必须和真实内容一致，替换瞬间零位移
- 微光动画要慢而轻，别比真实内容还抢眼
- 3 秒还没数据就退出骨架，给空状态或重试，别无限微光

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{layout}} | enum | 列表 | 列表 / 详情 / 卡片网格 |
| {{shimmer}} | enum | 微光扫过 | 微光 / 呼吸 / 静态 |
| {{max-wait}} | enum | 超过 3 秒切空/错误态 | 兜底策略 |

## 约束 Constraints

- 不要这样做：加载快于 300ms 的场景别上骨架（一闪而过反而像故障）；结构未知的生成式内容用进度提示。

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
