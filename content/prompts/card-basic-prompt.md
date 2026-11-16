---
id: "card-basic-prompt"
kind: "prompt"
type: "prompt"
name_zh: "基础卡片 · 提示词"
name_en: "Basic Card Prompt"
summary_zh: "生成「基础卡片」的填空式提示词"
description: "Fill-in prompt that generates a Basic Card component"
keywords: ["prompt","component","card-basic"]
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
entry: "card-basic"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{media-ratio}}","type":"enum","default":"16:9","range":"16:9 / 4:3 / 1:1 / 无图","unit":""},{"name":"{{padding}}","type":"length","default":"16","range":"12–24","unit":"px"},{"name":"{{actions}}","type":"text","default":"查看详情","range":"0–2 个","unit":""}]
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

为我生成一个「基础卡片」组件。用途：一块内容一个卡：图在上、标题摘要在下，带一两个操作——商品、文章、课程都用它装。使用场景：内容条目需要图文混排且条目间地位平等时——Feed、课程列表、作品集的第一选择。

## 效果描述 Description

基础卡片是最通用的内容容器：媒体区、标题、摘要、元信息、操作区自上而下，用边框或阴影从背景里浮出来。网格里等高对齐、列表里通栏排，都成立。

细节要求：
- 标题最多两行、摘要最多两行，超出省略——卡片的整齐靠截断纪律
- 整卡可点时，卡内不要再放第二个可点元素（嵌套点击是事故源）
- 阴影和边框二选一，描边 + 大阴影会显脏

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{media-ratio}} | enum | 16:9 | 16:9 / 4:3 / 1:1 / 无图 |
| {{padding}} | length | 16 | 12–24 |
| {{actions}} | text | 查看详情 | 0–2 个 |

## 约束 Constraints

- 不要这样做：纯文字短条目用列表行更省空间；数据字段多的条目用表格，卡片装不下比较。

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
