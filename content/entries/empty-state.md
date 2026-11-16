---
id: "empty-state"
kind: "entry"
type: "component"
name_zh: "空状态"
name_en: "Empty State"
summary_zh: "没东西时出现的那块：一张小插画、一句说明、一个「去添加」的按钮。"
description: "What shows when there's nothing yet: a small illustration, one line of explanation, and a way to add the first item."
keywords: ["empty state","component","feedback"]
platforms: ["all"]
function: "feedback"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "empty-states"
prompts: ["empty-state-prompt"]
effects: ["entrance-motion"]
resources: ["open-doodles","undraw","lottiefiles"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

空状态不是错误页：它出现于「本来就还没有」的时刻——没数据、没结果、没权限、断网，四种空各有说法和出路。结构是插画 + 一句为什么 + 一个下一步动作，三者齐全才算合格。

## 什么时候用

一切列表、搜索结果、消息中心都要预先设计它的四种空，别等上线后裸奔「暂无数据」。

## 什么时候不用

加载中不是空状态（那是骨架屏的活）；真正的系统错误走错误页，别用空状态粉饰。

## 细节与变体

- 搜索无结果的空状态第一动作是「清掉筛选」，不是让用户回首页
- 插画风格与引导页统一，别每个空状态换一个画师
- 无权限的空状态要说明找谁申请，而不是只写「无权限」

配套效果见下方「可用效果」。
