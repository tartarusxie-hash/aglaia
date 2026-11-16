---
id: "web-header-prompt"
kind: "prompt"
type: "prompt"
name_zh: "网站页眉导航 · 提示词"
name_en: "Website Header Prompt"
summary_zh: "生成「网站页眉导航」的填空式提示词"
description: "Fill-in prompt that generates a Website Header component"
keywords: ["prompt","component","web-header"]
platforms: ["web"]
function: "navigation"
placements: ["top-nav"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "web-header"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{nav-items}}","type":"text","default":"产品、价格、文档、关于","range":"4–6 个","unit":""},{"name":"{{sticky}}","type":"enum","default":"吸顶","range":"吸顶 / 不吸顶","unit":""},{"name":"{{cta-text}}","type":"text","default":"免费开始","range":"按钮文案","unit":""}]
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

为我生成一个「网站页眉导航」组件。用途：网站最上面那条横栏：Logo 在左，导航在中，登录/注册按钮在右，滚动时常吸顶。使用场景：任何多页网站都需要；落地页可以简化为只有 Logo + CTA 的版本。

## 效果描述 Description

网站页眉是全站的门面与路标：Logo 锚定左上，主导航 4–6 项，右侧放登录与一个主行动按钮。页面往下滚时吸顶常驻，长页里随时能跳走或转化。

细节要求：
- 主 CTA 只留一个且用实心按钮，其余链接用文字样式，层级一眼分明
- 移动端导航收进汉堡菜单，展开为全屏或抽屉列表
- 吸顶时加一条底部分隔线或轻阴影，和内容分开层次

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{nav-items}} | text | 产品、价格、文档、关于 | 4–6 个 |
| {{sticky}} | enum | 吸顶 | 吸顶 / 不吸顶 |
| {{cta-text}} | text | 免费开始 | 按钮文案 |

## 约束 Constraints

- 不要这样做：单页应用内部的工作区别用页眉占高度（那是顶栏和侧栏的位置）；导航项超过 7 个要上二级菜单或重新分组。

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
