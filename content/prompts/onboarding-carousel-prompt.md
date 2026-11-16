---
id: "onboarding-carousel-prompt"
kind: "prompt"
type: "prompt"
name_zh: "新手引导轮播 · 提示词"
name_en: "Onboarding Carousel Prompt"
summary_zh: "生成「新手引导轮播」的填空式提示词"
description: "Fill-in prompt that generates a Onboarding Carousel component"
keywords: ["prompt","component","onboarding-carousel"]
platforms: ["ios","android","harmonyos","web-mobile"]
function: "onboarding"
placements: ["full-screen"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "onboarding-carousel"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{page-count}}","type":"enum","default":"3","range":"3–4 屏","unit":""},{"name":"{{illustration}}","type":"text","default":"统一风格插画","range":"插画来源/风格","unit":""},{"name":"{{skippable}}","type":"enum","default":"可跳过","range":"可跳过 / 不可跳边","unit":""}]
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

为我生成一个「新手引导轮播」组件。用途：第一次打开 App 时的那几屏：大图、一个卖点、一排圆点，最后落到「开始使用」。使用场景：产品价值一句话说不清、或核心功能需要先建立概念时，用它争取 15 秒的讲解时间。

## 效果描述 Description

引导轮播用 3–4 屏把产品最打动人的价值讲完：每屏一个卖点，配图风格统一，底部圆点报进度，最后一屏放开始按钮。右上角常驻「跳过」，老用户和急脾气都不勉强。

细节要求：
- 每屏文案：一句标题（卖点）+ 一行说明，多一个字都是负担
- 插画风格必须统一：人物比例、配色、线条一套到底
- 最后一屏的按钮是整屏唯一的实心按钮，别放第二个 CTA

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{page-count}} | enum | 3 | 3–4 屏 |
| {{illustration}} | text | 统一风格插画 | 插画来源/风格 |
| {{skippable}} | enum | 可跳过 | 可跳过 / 不可跳边 |

## 约束 Constraints

- 不要这样做：价值一眼明了的工具类产品别硬上引导——直接让人用，第一次操作里再教（渐进式引导）。

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
