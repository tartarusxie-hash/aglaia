---
id: "error-404-prompt"
kind: "prompt"
type: "prompt"
name_zh: "404 错误页 · 提示词"
name_en: "404 Error Page Prompt"
summary_zh: "生成「404 错误页」的填空式提示词"
description: "Fill-in prompt that generates a 404 Error Page component"
keywords: ["prompt","component","error-404"]
platforms: ["web"]
function: "feedback"
placements: ["full-screen"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "error-404"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{illustration}}","type":"text","default":"大数字或插画","range":"风格","unit":""},{"name":"{{actions}}","type":"text","default":"回首页 / 去搜索","range":"按钮组合","unit":""},{"name":"{{report-link}}","type":"enum","default":"有「报告死链」入口","range":"有 / 无","unit":""}]
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

为我生成一个「404 错误页」组件。用途：走错路时看到的那页：一个大大的 404、一句人话、两个按钮（回首页、去搜索）。使用场景：任何网站都要预备它；同理还有 500、维护页、无权限页，结构同源。

## 效果描述 Description

404 页的任务是把走错路的人送回正道：先承认「这一页不存在」（别甩锅用户），再给两条最可能的路——回首页、去搜索，进阶一点给热门内容链接。它是错误页家族的代表：说人话、给原因、给出路。

细节要求：
- 别把锅甩给用户（「你访问的页面」不如「这一页搬走了」中性）
- 幽默可以有，但出路按钮必须比段子显眼
- 记日志：高频 404 地址是导航或外链坏掉的信号

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{illustration}} | text | 大数字或插画 | 风格 |
| {{actions}} | text | 回首页 / 去搜索 | 按钮组合 |
| {{report-link}} | enum | 有「报告死链」入口 | 有 / 无 |

## 约束 Constraints

- 不要这样做：应用内的局部加载失败别整页 404，那是行内重试组件的位置。

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
