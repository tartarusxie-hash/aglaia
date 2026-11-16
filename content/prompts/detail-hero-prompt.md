---
id: "detail-hero-prompt"
kind: "prompt"
type: "prompt"
name_zh: "详情页头图区 · 提示词"
name_en: "Detail Hero Prompt"
summary_zh: "生成「详情页头图区」的填空式提示词"
description: "Fill-in prompt that generates a Detail Hero component"
keywords: ["prompt","component","detail-hero"]
platforms: ["all"]
function: "content"
placements: ["content-area","floating"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "detail-hero"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{media-ratio}}","type":"enum","default":"4:3","range":"16:9 / 4:3 / 1:1","unit":""},{"name":"{{sticky-cta}}","type":"enum","default":"底部吸底操作条","range":"有 / 无","unit":""},{"name":"{{meta-items}}","type":"text","default":"作者、时间、评分","range":"2–4 项","unit":""}]
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

为我生成一个「详情页头图区」组件。用途：详情页开头那块：大图或封面、标题、关键信息，再往下才是正文，底部常吸一个购买/收藏条。使用场景：商品详情、文章详情、课程详情、房源详情——一切「看清一个再决定」的页面开头。

## 效果描述 Description

详情页头图区在三秒内回答「这是什么、值不值得继续看」：媒体先给感性判断，标题给理性确认，元信息（作者/评分/价格）给信任，之后正文展开，转化动作吸底常驻。

细节要求：
- 头图区总高度别超过首屏 60%，要给正文露一截钩子
- 吸底操作条最多两个按钮：主行动 + 一个次行动（收藏/分享二选一）
- 标题字号是全页最大，但别超过 28px 在移动端喧宾夺主

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{media-ratio}} | enum | 4:3 | 16:9 / 4:3 / 1:1 |
| {{sticky-cta}} | enum | 底部吸底操作条 | 有 / 无 |
| {{meta-items}} | text | 作者、时间、评分 | 2–4 项 |

## 约束 Constraints

- 不要这样做：信息密度优先的工作页面（数据详情、工单详情）别用大头图占首屏，字段前置更重要。

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
