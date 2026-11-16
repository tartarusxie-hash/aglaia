---
id: "picker-select-prompt"
kind: "prompt"
type: "prompt"
name_zh: "选择器 · 提示词"
name_en: "Picker / Select Prompt"
summary_zh: "生成「选择器」的填空式提示词"
description: "Fill-in prompt that generates a Picker / Select component"
keywords: ["prompt","component","picker-select"]
platforms: ["all"]
function: "form"
placements: ["bottom-sheet","content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "picker-select"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{mode}}","type":"enum","default":"单选","range":"单选 / 多选","unit":""},{"name":"{{presentation}}","type":"enum","default":"底部弹层","range":"底部弹层 / 下拉 / 全屏页","unit":""},{"name":"{{searchable}}","type":"enum","default":"选项多时可搜索","range":"可搜索 / 不可搜索","unit":""}]
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

为我生成一个「选择器」组件。用途：点一下弹出一列选项让你挑：城市、日期、分类——不用打字，从现成的里选。使用场景：选项来自固定集合（城市、类目、状态）时——挑永远比打字快且不出错。

## 效果描述 Description

选择器把「输入」变「挑选」：触发器长得像输入框，点开后移动端从底部升起滚轮或列表，桌面端展开下拉。选项多时带搜索，选完触发器显示结果，带清除小叉。

细节要求：
- 选项超過 20 个必须给搜索或分组，否则滚动找选项是酷刑
- 默认选中要有理由（最近用过/最常用），别默认第一个糊弄
- 多选时触发器显示「已选 3 项」而不是把名字全塞进去溢出

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{mode}} | enum | 单选 | 单选 / 多选 |
| {{presentation}} | enum | 底部弹层 | 底部弹层 / 下拉 / 全屏页 |
| {{searchable}} | enum | 选项多时可搜索 | 可搜索 / 不可搜索 |

## 约束 Constraints

- 不要这样做：选项只有 2–4 个时直接平铺单选按钮，别藏进选择器多一次点击；自由文本更别伪装成选择器。

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
