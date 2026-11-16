---
id: "profile-header"
kind: "entry"
type: "component"
name_zh: "个人中心头部"
name_en: "Profile Header"
summary_zh: "「我的」页面最上面那块：头像、昵称、一行数据（关注/粉丝/积分）和编辑按钮。"
description: "The top block of a Me page: avatar, nickname, a row of stats, and an edit button."
keywords: ["profile header","component","personal"]
platforms: ["ios","android","harmonyos","web"]
function: "personal"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "profile"
prompts: ["profile-header-prompt"]
effects: ["avatar-stack"]
resources: ["tdesign","ant-design"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

个人中心头部是用户身份的展示面：大头像、昵称与账号、关键数据横排，点任意处或编辑按钮进资料页。有会员体系时把会员标识贴在昵称旁，别单独占一行。

## 什么时候用

有账号体系的 App 的「我的」页顶部；社区类产品还兼做他人主页的头部。

## 什么时候不用

工具类产品没有社交与资产时，一行简洁的账号行就够，别硬撑一个大头部占首屏。

## 细节与变体

- 头像用本站「头像堆叠」之外的单人形态：圆形、至少 56px
- 数据行每个数字都可点进对应列表，不可点的数字别加粗
- 未登录态整体换成「点击登录」入口，不要留一片假数据

配套效果见下方「可用效果」。
