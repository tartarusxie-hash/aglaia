---
id: "profile-header-prompt"
kind: "prompt"
type: "prompt"
name_zh: "个人中心头部 · 提示词"
name_en: "Profile Header Prompt"
summary_zh: "生成「个人中心头部」的填空式提示词"
description: "Fill-in prompt that generates a Profile Header component"
keywords: ["prompt","component","profile-header"]
platforms: ["ios","android","harmonyos","web"]
function: "personal"
placements: ["content-area"]
granularity: "component"
status: "stale"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
level: "component"
entry: "profile-header"
version: "1.0.0"
targets: ["html-css","tailwind","react"]
parameters: [{"name":"{{stats}}","type":"text","default":"关注、粉丝、获赞","range":"3–4 个数据","unit":""},{"name":"{{edit-entry}}","type":"enum","default":"编辑资料按钮","range":"按钮 / 点整行进入","unit":""},{"name":"{{member-badge}}","type":"enum","default":"有会员标识","range":"有 / 无","unit":""}]
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

为我生成一个「个人中心头部」组件。用途：「我的」页面最上面那块：头像、昵称、一行数据（关注/粉丝/积分）和编辑按钮。使用场景：有账号体系的 App 的「我的」页顶部；社区类产品还兼做他人主页的头部。

## 效果描述 Description

个人中心头部是用户身份的展示面：大头像、昵称与账号、关键数据横排，点任意处或编辑按钮进资料页。有会员体系时把会员标识贴在昵称旁，别单独占一行。

细节要求：
- 头像用本站「头像堆叠」之外的单人形态：圆形、至少 56px
- 数据行每个数字都可点进对应列表，不可点的数字别加粗
- 未登录态整体换成「点击登录」入口，不要留一片假数据

## 设计 Tokens

颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。

本组件参数（在参数范围内取值，我没指定时用默认）：

| 参数 | 类型 | 默认 | 范围 |
|---|---|---|---|
| {{stats}} | text | 关注、粉丝、获赞 | 3–4 个数据 |
| {{edit-entry}} | enum | 编辑资料按钮 | 按钮 / 点整行进入 |
| {{member-badge}} | enum | 有会员标识 | 有 / 无 |

## 约束 Constraints

- 不要这样做：工具类产品没有社交与资产时，一行简洁的账号行就够，别硬撑一个大头部占首屏。

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
