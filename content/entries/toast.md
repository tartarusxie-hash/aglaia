---
id: "toast"
kind: "entry"
type: "component"
name_zh: "轻提示 Toast"
name_en: "Toast"
summary_zh: "屏幕边上飘一下就消失的小条：「已保存」「复制成功」——不打断你手上的事。"
description: "A small bar that floats in and fades out — 'Saved', 'Copied' — without interrupting the task."
keywords: ["toast","component","feedback"]
platforms: ["all"]
function: "feedback"
placements: ["floating","overlay"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "loading-feedback"
prompts: ["toast-prompt"]
effects: ["entrance-motion"]
resources: ["shadcn-ui","mantine"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

Toast 是最低打扰级别的反馈：出现在屏幕边缘，2–4 秒自动消失，不需要用户点确认。适合成功确认和可撤销操作的回执（删除后给 5 秒撤销），不适合需要用户做决定的事。

## 什么时候用

操作成功、状态变更、后台任务完成的即时回执。

## 什么时候不用

报错需要用户处理、或信息必须被读完时别用 Toast（一飘就没，用户还没看清就消失了）——那是横幅和弹窗的活。

## 细节与变体

- 文案说结果不说过程：「已保存」而不是「保存成功啦！」再加个感叹号阵列
- 同类 Toast 连续触发要合并或替换，别叠罗汉挡住内容
- 带操作的 Toast（撤销）停留时间要给足 4 秒以上

配套效果见下方「可用效果」。
