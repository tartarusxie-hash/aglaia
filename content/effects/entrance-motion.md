---
id: "entrance-motion"
kind: "effect"
type: "effect"
name_zh: "入场动效"
name_en: "Entrance Motion"
summary_zh: "一组元素逐个淡入上浮，像排队进场"
description: "A group of elements fades and rises in, one after another, like a queue"
keywords: ["entrance motion","effect","css","entrance-motion"]
platforms: ["all"]
function: "motion"
placements: ["content-area"]
granularity: "effect"
status: "published"
license:
  spdx: "MIT"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
preview_code: "src/lib/effects-data.mjs#entrance-motion"
code_targets: ["html-css","tailwind","react"]
applies_to: []
parameters: [{"name":"{{easing}}","type":"enum","default":"ease-out-expo","range":"ease-out-expo / ease-out-back / ease-in-out / linear","unit":""},{"name":"{{duration}}","type":"length","default":"600","range":"200–1200","unit":"ms"},{"name":"{{stagger}}","type":"length","default":"90","range":"0–200","unit":"ms"},{"name":"{{direction}}","type":"enum","default":"up","range":"up / down / left / right","unit":""}]
slider_params: [{"name":"easing","label_zh":"缓动曲线","label_en":"Easing","type":"enum","kind":"select","options":["ease-out-expo","ease-out-back","ease-in-out","linear"],"default":"ease-out-expo","label_options":{"ease-out-expo":"利落落稳","ease-out-back":"带回弹","ease-in-out":"对称呼吸","linear":"匀速"}},{"name":"duration","label_zh":"时长","label_en":"Duration","type":"length","kind":"range","min":200,"max":1200,"step":50,"default":"600","unit":"ms"},{"name":"stagger","label_zh":"逐个延迟","label_en":"Stagger","type":"length","kind":"range","min":0,"max":200,"step":10,"default":"90","unit":"ms"},{"name":"direction","label_zh":"入场方向","label_en":"Direction","type":"enum","kind":"select","options":["up","down","left","right"],"default":"up","label_options":{"up":"自下而上","down":"自上而下","left":"自右向左","right":"自左向右"}}]
interactive: true
created: "2026-11-10"
updated: "2026-11-10"
---

## 它是怎么工作的（中文）

每个元素从「透明 + 偏移 20 多像素」动到原位，相邻元素延迟几十毫秒，就成了队列感。曲线选 ease-out-expo 最稳妥：快起慢停，眼睛觉得利落。延迟别超过每个 120ms、总数别超过 8 个，否则用户会觉得页面在「表演」而不是在「响应」。

## How it works (English)

Each element animates from transparent + ~24px offset to its resting place, staggered by a few dozen milliseconds — that delay is what creates the queue feel. Ease-out-expo is the safest curve: fast start, gentle landing. Keep per-item delay under ~120ms and total items under ~8, or the page feels like it's performing instead of responding.

## 参考与来源 Sources

本条为「批次 1（重建）」成果（2026-11-10 用户决定：原 妞妞老师 素材不导出，改由公开材料重建）：效果概念参考开源效果生态——Magic UI（MIT）、Uiverse（MIT）、Animista、Paper Shaders（Apache-2.0）、tsParticles（MIT）、CSS Loaders（MIT）等（见 /resources 对应条目，许可以各项目为准）；本站的实现代码、参数体系与全部文案均为 Aglaia 原创，未复制上述项目的代码或文案，也与 妞妞老师 原始素材无关。
