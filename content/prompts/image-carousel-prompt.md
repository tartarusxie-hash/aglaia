---
id: "image-carousel-prompt"
kind: "prompt"
type: "prompt"
name_zh: "图片轮播 · 提示词"
name_en: "Image Carousel Prompt"
summary_zh: "生成「图片轮播」的填空式提示词"
description: "Fill-in prompt that generates a Image Carousel component"
keywords: ["prompt","component","image-carousel"]
platforms: ["all"]
function: "media"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "image-carousel"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{autoplay}}","type":"enum","default":"不自动播放","range":"自动 / 不自动","unit":""},{"name":"{{indicator}}","type":"enum","default":"圆点","range":"圆点 / 数字（2/5）","unit":""},{"name":"{{ratio}}","type":"enum","default":"16:9","range":"16:9 / 4:3 / 1:1","unit":""}]
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

为我生成一个「图片轮播」组件。用途：一排图左右滑着看：商品图、活动 banner 都住这里，下面一排小圆点报位置。使用场景：商品多图、详情页图集、首页活动位（≤5 张）。

## 效果描述 Description

轮播把多张图叠进一个画框：手势或箭头切换，圆点或数字标位置。它的价值在省版面，代价在后面的图天生没人看——所以第一张必须放最重要的，后面的只配做补充。

细节要求：
- 自动播放必须可暂停，且用户手动切过就停止自动
- 数字指示（2/5）比圆点更耐多图（>5 张时圆点会溢出）
- 图片比例必须统一，不齐的图用背景填充或裁切，别让画框高度跳来跳去

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{autoplay}} | enum | 不自动播放 | 自动 / 不自动 |
| {{indicator}} | enum | 圆点 | 圆点 / 数字（2/5） |
| {{ratio}} | enum | 16:9 | 16:9 / 4:3 / 1:1 |

## 约束 Constraints

- 不要这样做：核心信息拆在第 3、4 张图里等于没放；营销页 Hero 别用轮播讲三个卖点——一屏一个卖点才记得住。

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
