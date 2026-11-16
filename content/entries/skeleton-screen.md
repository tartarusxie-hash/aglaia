---
id: "skeleton-screen"
kind: "entry"
type: "component"
name_zh: "骨架屏"
name_en: "Skeleton Screen"
summary_zh: "数据来之前先摆出的灰色轮廓：标题是灰条、图是灰块，一道微光扫过表示在加载。"
description: "Gray placeholder shapes shown while data loads: bars for text, blocks for images, a sheen sweeping across."
keywords: ["skeleton screen","component","feedback"]
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
pattern: "loading-feedback"
prompts: ["skeleton-screen-prompt"]
effects: ["shimmer-skeleton"]
resources: ["css-loaders","magic-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

骨架屏用与真实内容同尺寸的灰块先占住版式，数据到了原地替换，页面不跳、不晃。它卖的是「已经在加载了」的确定感，比白屏和转圈都更让人愿意等。

## 什么时候用

结构已知、内容未知的加载场景：信息流、详情页、个人中心。

## 什么时候不用

加载快于 300ms 的场景别上骨架（一闪而过反而像故障）；结构未知的生成式内容用进度提示。

## 细节与变体

- 骨架块尺寸必须和真实内容一致，替换瞬间零位移
- 微光动画要慢而轻，别比真实内容还抢眼
- 3 秒还没数据就退出骨架，给空状态或重试，别无限微光

配套效果见下方「可用效果」。
