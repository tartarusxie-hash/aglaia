---
id: "masonry-grid-prompt"
kind: "prompt"
type: "prompt"
name_zh: "瀑布流 · 提示词"
name_en: "Masonry Grid Prompt"
summary_zh: "生成「瀑布流」的填空式提示词"
description: "Fill-in prompt that generates a Masonry Grid component"
keywords: ["prompt","component","masonry-grid"]
platforms: ["all"]
function: "content"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "masonry-grid"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{columns}}","type":"enum","default":"2","range":"2–4","unit":""},{"name":"{{gap}}","type":"length","default":"12","range":"8–16","unit":"px"},{"name":"{{caption}}","type":"enum","default":"图下标题+作者","range":"标题 / 标题+作者 / 无","unit":""}]
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

为我生成一个「瀑布流」组件。用途：两列错落排图：高的高矮的矮，像小红书和 Pinterest 那样越逛越上头。使用场景：图片为主、鼓励漫无目的浏览的产品：灵感、穿搭、菜谱、设计图。

## 效果描述 Description

瀑布流按内容原始比例排布，消灭裁切和留白，让图片自己决定高度。它牺牲阅读顺序换取浏览密度和新鲜感，是内容发现型产品的发动机。

细节要求：
- 列宽固定、只让高度变，混进视频卡时先定封面比例再插入
- 加载更多时新内容只往列尾追加，不能重排已有内容（用户会丢失位置）
- 标题区高度不齐是常态，别为了对齐把标题区做成等高裁切

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{columns}} | enum | 2 | 2–4 |
| {{gap}} | length | 12 | 8–16 |
| {{caption}} | enum | 图下标题+作者 | 标题 / 标题+作者 / 无 |

## 约束 Constraints

- 不要这样做：内容需要顺序（教程步骤）、或每条都要仔细读（新闻列表）时别用，错落会打乱理解。

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
