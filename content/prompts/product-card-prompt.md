---
id: "product-card-prompt"
kind: "prompt"
type: "prompt"
name_zh: "商品卡 · 提示词"
name_en: "Product Card Prompt"
summary_zh: "生成「商品卡」的填空式提示词"
description: "Fill-in prompt that generates a Product Card component"
keywords: ["prompt","component","product-card"]
platforms: ["all"]
function: "commerce"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "product-card"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{price-style}}","type":"enum","default":"现价 + 划线原价","range":"仅现价 / 现价+原价","unit":""},{"name":"{{badge}}","type":"enum","default":"左上角促销角标","range":"角标文案或无","unit":""},{"name":"{{ratio}}","type":"enum","default":"1:1","range":"1:1 / 3:4","unit":""}]
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

为我生成一个「商品卡」组件。用途：卖货的卡：商品图、名字、价格、销量或评价，点进去就是详情。使用场景：电商列表、推荐位、搜索结果——一切陈列商品的地方。

## 效果描述 Description

商品卡为「快速比较后下单」优化：图占一半以上建立欲望，名字两行讲清是什么，价格用最大字重抢视线，原价划线造锚点，销量/评分给信任。促销角标只贴一个，多了互相抵消。

细节要求：
- 价格的小数位、货币符号字号要小于整数部分，这是行业惯例
- 图加载前用同色块占位，防止卡片高度跳动
- 「已售罄」状态直接压在图上置灰，不要等点进去才发现

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{price-style}} | enum | 现价 + 划线原价 | 仅现价 / 现价+原价 |
| {{badge}} | enum | 左上角促销角标 | 角标文案或无 |
| {{ratio}} | enum | 1:1 | 1:1 / 3:4 |

## 约束 Constraints

- 不要这样做：只有三五个商品的精品陈列可以放大图做编辑式排版，别用统一卡片把气质磨平。

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
