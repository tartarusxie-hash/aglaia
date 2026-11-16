---
id: "checkout-form"
kind: "entry"
type: "component"
name_zh: "结算表单"
name_en: "Checkout Form"
summary_zh: "付钱前最后一段路：确认商品、选地址、看优惠、选支付方式、点下单。"
description: "The last stretch before paying: review items, pick an address, apply discounts, choose payment, place the order."
keywords: ["checkout form","component","commerce"]
platforms: ["all"]
function: "commerce"
placements: ["content-area"]
granularity: "component"
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
pattern: "checkout"
prompts: ["checkout-form-prompt"]
effects: ["steps-indicator","striped-progress"]
resources: ["ant-design","shadcn-ui"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

结算表单的目标是让用户安心地把钱付完：金额明细永远可见且可展开核对，地址与支付方式给默认选中项减少操作，优惠自动抵扣并说明，每一步都有明确的总价。分步还是单页取决于信息量，移动端多为单页滚动。

## 什么时候用

一切电商与付费服务的付款环节；步骤指示器在这里告诉用户还剩几步。

## 什么时候不用

单件数字商品（付完即得）可以缩到一个支付弹窗，别用整页结算吓退冲动消费。

## 细节与变体

- 总价在提交按钮上再写一遍，用户点之前不用回滚确认
- 报错定位到具体字段并自动滚动过去，别只在顶部飘一句「提交失败」
- 离开结算页再回来，填过的信息要保留（草稿态）

配套效果见下方「可用效果」。
