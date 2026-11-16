---
id: "grouped-list-prompt"
kind: "prompt"
type: "prompt"
name_zh: "分组列表 · 提示词"
name_en: "Grouped List Prompt"
summary_zh: "生成「分组列表」的填空式提示词"
description: "Fill-in prompt that generates a Grouped List component"
keywords: ["prompt","component","grouped-list"]
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
entry: "grouped-list"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{group-header}}","type":"enum","default":"吸顶","range":"吸顶 / 不吸顶","unit":""},{"name":"{{index-bar}}","type":"enum","default":"无","range":"有 A–Z 索引 / 无","unit":""},{"name":"{{group-count}}","type":"enum","default":"4","range":"2–10 组","unit":""}]
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

为我生成一个「分组列表」组件。用途：带组头的列表：组名小字压在每组上方，滚动时组头吸顶，A–Z 索引还能点字母跳。使用场景：条目超过 30 条且有自然分组依据时——通讯录、城市选择、按日期归档的记录。

## 效果描述 Description

分组列表在基础列表之上加一层秩序：按类别、时间或字母把行分段，组头说明这一段是什么。长列表配吸顶组头（永远知道自己在哪组）和右侧字母索引（点字母直达），通讯录就是经典形态。

细节要求：
- 组头背景与行背景要有区分（浅一档或加粗小字），但别用重色块
- 索引条热区要宽（至少 20px），字母本身可以只有 10px
- 空组不渲染组头，避免出现只有标题没有内容的尴尬段

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{group-header}} | enum | 吸顶 | 吸顶 / 不吸顶 |
| {{index-bar}} | enum | 无 | 有 A–Z 索引 / 无 |
| {{group-count}} | enum | 4 | 2–10 组 |

## 约束 Constraints

- 不要这样做：条目不多（<15）或分组依据是硬凑的时别用，组头只会切碎阅读节奏。

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
