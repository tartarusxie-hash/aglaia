---
id: "lab-easing"
kind: "guide"
guide_type: "lab"
discipline: "motion"
name_zh: "动效实验室：缓动曲线"
name_en: "Easing Curve Lab"
summary_zh: "选一条曲线看小球如何走完同一段路——进场 ease-out、离场 ease-in，匀速只适合进度与旋转。"
description: "Interactive easing-curve instrument: pick a cubic-bezier preset and a duration, watch the ball's speed character, copy the CSS."
keywords: ["easing", "cubic-bezier", "motion lab", "animation"]
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
created: "2026-11-10"
updated: "2026-11-10"
---

选一条曲线看小球如何走完同一段路——进场 ease-out、离场 ease-in，匀速只适合进度与旋转。

## 行为说明（Phase 2 按此重写代码）

**输入**：4 个预置曲线按钮（单选）+ 时长滑杆（150–1600ms，步进 50，默认 600ms）。

**预置曲线（cubic-bezier）**：

- easeOutExpo · 利落落稳：`cubic-bezier(0.22, 1, 0.36, 1)`（默认选中）
- easeOutBack · 带回弹：`cubic-bezier(0.34, 1.56, 0.64, 1)`
- easeInOut · 对称呼吸：`cubic-bezier(0.65, 0, 0.35, 1)`
- linear · 匀速：`linear`

**行为**：选中曲线或改时长后自动播放：小球用 Web Animations API 以所选曲线与时长从左端移动到右端（距离 = 舞台宽 − 64px），停顿 450ms 后以 ease-in-out、时长 ×0.6 返回。代码条实时显示 `transition-timing-function: <曲线>;` 并提供一键复制。滑杆旁标注：150ms 微反馈 / 400ms Doherty 阈值 / 1600ms 已经算慢。

**讲解文案**：进场用 ease-out（快到慢，像东西落稳），离场用 ease-in，匀速 linear 只适合进度与旋转。

**与 TokenSet 的关系**：上述预置曲线已抽入 `tokens/tokens.json` 的 motion.easing 令牌。
