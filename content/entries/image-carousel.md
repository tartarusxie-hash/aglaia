---
id: "image-carousel"
kind: "entry"
type: "component"
name_zh: "图片轮播"
name_en: "Image Carousel"
summary_zh: "一排图左右滑着看：商品图、活动 banner 都住这里，下面一排小圆点报位置。"
description: "A swipeable row of images — product photos, promo banners — with dot indicators showing position."
keywords: ["image carousel","component","media"]
platforms: ["all"]
function: "media"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "media"
prompts: ["image-carousel-prompt"]
effects: ["image-zoom","entrance-motion"]
resources: ["getwidget","magic-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

轮播把多张图叠进一个画框：手势或箭头切换，圆点或数字标位置。它的价值在省版面，代价在后面的图天生没人看——所以第一张必须放最重要的，后面的只配做补充。

## 什么时候用

商品多图、详情页图集、首页活动位（≤5 张）。

## 什么时候不用

核心信息拆在第 3、4 张图里等于没放；营销页 Hero 别用轮播讲三个卖点——一屏一个卖点才记得住。

## 细节与变体

- 自动播放必须可暂停，且用户手动切过就停止自动
- 数字指示（2/5）比圆点更耐多图（>5 张时圆点会溢出）
- 图片比例必须统一，不齐的图用背景填充或裁切，别让画框高度跳来跳去

配套效果见下方「可用效果」。
