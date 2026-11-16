---
id: "list-item-prompt"
kind: "prompt"
type: "prompt"
name_zh: "基础列表行 · 提示词"
name_en: "List Item Prompt"
summary_zh: "生成「基础列表行」的填空式提示词"
description: "Fill-in prompt that generates a List Item component"
keywords: ["prompt","component","list-item"]
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
entry: "list-item"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{leading}}","type":"enum","default":"图标","range":"头像 / 图标 / 无","unit":""},{"name":"{{lines}}","type":"enum","default":"双行","range":"单行 / 双行","unit":""},{"name":"{{trailing}}","type":"enum","default":"箭头","range":"箭头 / 开关 / 文字 / 无","unit":""}]
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

为我生成一个「基础列表行」组件。用途：最万能的内容行：左边头像或图标，中间标题与副文案，右边箭头或数值。使用场景：内容是同质条目、需要快速扫读和逐条进入时——联系人、文件、订单、文章都从它开始。

## 效果描述 Description

列表行是界面的基本粒子：左侧配件（头像、图标）、主副两行文字、右侧配件（箭头、数值、开关）三段式组合，换配件就能表达导航、信息、设置、联系人等几十种语义。整行可点，热区就是整行。

细节要求：
- 行高至少 48px，副文案比主文案小一号、弱一档颜色
- 右侧配件只放一个，两个配件并排用户会犹豫点哪个
- 可滑动出操作（删除/置顶）时要给点击替代，老用户找不到滑动

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{leading}} | enum | 图标 | 头像 / 图标 / 无 |
| {{lines}} | enum | 双行 | 单行 / 双行 |
| {{trailing}} | enum | 箭头 | 箭头 / 开关 / 文字 / 无 |

## 约束 Constraints

- 不要这样做：条目之间差异大、图是主角时用卡片；需要横向比较字段时用表格，别用列表硬撑。

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
