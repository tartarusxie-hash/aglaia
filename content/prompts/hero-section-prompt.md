---
id: "hero-section-prompt"
kind: "prompt"
type: "prompt"
name_zh: "落地页 Hero · 提示词"
name_en: "Hero Section Prompt"
summary_zh: "生成「落地页 Hero」的填空式提示词"
description: "Fill-in prompt that generates a Hero Section component"
keywords: ["prompt","component","hero-section"]
platforms: ["web"]
function: "marketing"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "hero-section"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{layout}}","type":"enum","default":"左文右图","range":"左文右图 / 居中 / 图下置","unit":""},{"name":"{{cta}}","type":"text","default":"免费开始","range":"主按钮文案","unit":""},{"name":"{{proof}}","type":"enum","default":"按钮下小字社会证明","range":"评分/用户数/无","unit":""}]
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

为我生成一个「落地页 Hero」组件。用途：落地页第一屏：一句大标题、一行副文案、一个大按钮，右边或下边一张产品图。使用场景：一切落地页、产品官网、活动页的第一屏。

## 效果描述 Description

Hero 用 3 秒完成说服的第一步：标题只讲用户得到什么（不讲公司多牛），副标题补一句怎么做，CTA 是全屏唯一主按钮，下方小字给社会证明降风险。产品图要真图或高保真界面，别用抽象插画糊弄科技产品。

细节要求：
- 标题不超过两行、20 字上下，能测试「去掉一半字还成立吗」
- 主按钮文案写结果（开始免费试用）不写动作（提交）
- 首屏底部要露出下一节的一角，暗示可以往下滚

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{layout}} | enum | 左文右图 | 左文右图 / 居中 / 图下置 |
| {{cta}} | text | 免费开始 | 主按钮文案 |
| {{proof}} | enum | 按钮下小字社会证明 | 评分/用户数/无 |

## 约束 Constraints

- 不要这样做：内容型页面（博客、文档）的首页 Hero 要让位给内容本身，压到一条横幅的高度即可。

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
