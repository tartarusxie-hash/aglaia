---
id: "search-bar-prompt"
kind: "prompt"
type: "prompt"
name_zh: "搜索框 · 提示词"
name_en: "Search Bar Prompt"
summary_zh: "生成「搜索框」的填空式提示词"
description: "Fill-in prompt that generates a Search Bar component"
keywords: ["prompt","component","search-bar"]
platforms: ["all"]
function: "search"
placements: ["top-nav","content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "search-bar"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{shape}}","type":"enum","default":"胶囊","range":"胶囊 / 圆角方形","unit":""},{"name":"{{trailing}}","type":"enum","default":"语音+扫码","range":"语音 / 扫码 / 无","unit":""},{"name":"{{hot-word}}","type":"enum","default":"占位符轮播热词","range":"有 / 无","unit":""}]
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

为我生成一个「搜索框」组件。用途：带放大镜的那个输入框：圆角胶囊、浅灰底，里面写着「搜你想要的」。使用场景：内容量大到翻页找不到、或用户目的明确（来搜某个东西）时，它应该在首屏最显眼处。

## 效果描述 Description

搜索框是用户主动表达需求的入口：放大镜图标定身份，浅底弱边降低压迫感，占位符给示例。电商和内容产品常在占位符里轮播热词，右侧挂语音、扫码等快捷输入。

细节要求：
- 点击后进入独立搜索页（带历史与热词），不要在当前页硬展开
- 输入框热区高度至少 40px，图标只是视觉中心不是热区边界
- 占位符轮播要慢（≥3 秒一条）且可被真实输入打断

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{shape}} | enum | 胶囊 | 胶囊 / 圆角方形 |
| {{trailing}} | enum | 语音+扫码 | 语音 / 扫码 / 无 |
| {{hot-word}} | enum | 占位符轮播热词 | 有 / 无 |

## 约束 Constraints

- 不要这样做：内容总量只有几十条的产品别把搜索放首屏 C 位——用户更需要的是分类浏览。

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
