---
id: "cart-item"
kind: "entry"
type: "component"
name_zh: "购物车条目"
name_en: "Cart Item"
summary_zh: "购物车里的一行：小图、名字、价格、数量步进器和一个勾选框，左滑还能删。"
description: "One row in the cart: thumbnail, name, price, quantity stepper, and a checkbox — swipe to delete."
keywords: ["cart item","component","commerce"]
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
prompts: ["cart-item-prompt"]
effects: ["custom-checkbox"]
resources: ["ant-design","tdesign"]
created: "2026-11-10"
updated: "2026-11-10"
---

## 大白话说明

购物车条目为「批量决策」优化：勾选框决定买不买，步进器调数量，左滑删除清仓，底部结算条实时合计选中金额。失效商品（下架/无货）要单独分组置灰，不和正常商品混排。

## 什么时候用

多件商品一起结算的电商购物车页；单件购买直接走结算，不需要购物车中转。

## 什么时候不用

只有一两种商品的小店别建购物车页，多一步就多一层流失。

## 细节与变体

- 数量减到 0 时弹确认删除，不要直接消失让用户以为点错了
- 合计金额只算勾选项，并实时跟随勾选变化跳动提示
- 步进器的加减按钮热区至少 32px，购物车是高频操作区

配套效果见下方「可用效果」。
