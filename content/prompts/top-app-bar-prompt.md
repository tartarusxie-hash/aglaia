---
id: "top-app-bar-prompt"
kind: "prompt"
type: "prompt"
name_zh: "顶部应用栏 · 提示词"
name_en: "Top App Bar Prompt"
summary_zh: "生成「顶部应用栏」的填空式提示词"
description: "Fill-in prompt that generates a Top App Bar component"
keywords: ["prompt","component","top-app-bar"]
platforms: ["all"]
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
entry: "top-app-bar"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{title-align}}","type":"enum","default":"左对齐","range":"左对齐 / 居中","unit":""},{"name":"{{actions}}","type":"text","default":"搜索、更多","range":"0–3 个图标按钮","unit":""},{"name":"{{divider}}","type":"enum","default":"分隔线","range":"分隔线 / 阴影 / 无","unit":""}]
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

为我生成一个「顶部应用栏」组件。用途：页面最上面那条：返回、标题、常用操作，一眼看清「我在哪、能干嘛」。使用场景：几乎每个页面都需要它——尤其是从列表进入的二级页面，返回和标题缺一不可。

## 效果描述 Description

顶部应用栏承载三件事：告诉用户当前页是什么（标题）、怎么回去（返回或菜单）、这一页最重要的操作（右侧 1–3 个图标按钮）。滚动时可固定在顶部，长标题截断省略。

细节要求：
- 右侧操作超过 3 个就把低频的收进「更多」菜单，别一字排开
- 标题过长用省略号，不要缩小字号硬塞
- 返回按钮的热区至少 44×44，哪怕图标只有 20px

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{title-align}} | enum | 左对齐 | 左对齐 / 居中 |
| {{actions}} | text | 搜索、更多 | 0–3 个图标按钮 |
| {{divider}} | enum | 分隔线 | 分隔线 / 阴影 / 无 |

## 约束 Constraints

- 不要这样做：沉浸式页面（图片详情、视频播放）可以让它透明或自动隐藏；全站级的网站导航不要用它代替（那是网站页眉）。

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
