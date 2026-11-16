---
id: "lab-contrast"
kind: "guide"
guide_type: "lab"
discipline: "visual"
name_zh: "对比度检查：好看之前，先要看得清"
name_en: "Contrast Checker (WCAG)"
summary_zh: "选文字色和背景色，实时按 WCAG 公式算对比度，正文 ≥ 4.5:1 才算看得清。"
description: "Interactive WCAG contrast checker: pick foreground/background colors, get the live contrast ratio and AA/AAA verdicts."
keywords: ["contrast", "wcag", "accessibility", "color lab"]
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
created: "2026-11-10"
updated: "2026-11-10"
---

选文字色和背景色，实时按 WCAG 公式算对比度，正文 ≥ 4.5:1 才算看得清。

## 行为说明（Phase 2 按此重写代码）

**输入**：文字色与背景色各一组 8 色色板（单选）：#16130e、#4c463c、#e2480d、#0f766e、#1d4ed8、#b07d10、#f7f5f0、#fffdf8（默认文字 #16130e、背景 #fffdf8）。

**计算**：按 WCAG 相对亮度公式（sRGB 分量线性化后 L = 0.2126R + 0.7152G + 0.0722B），对比度 = (L高 + 0.05) / (L低 + 0.05)，保留两位小数。

**输出**：预览句「设计先要被看见，然后才是被喜欢。」以所选前景/背景渲染；四枚徽标实时判定：对比度数值、正文 AA（≥4.5）、正文 AAA（≥7）、大字 AA（≥3），通过绿、不通过红。

**讲解文案**：正文需要 ≥ 4.5:1（AA），大标题 ≥ 3:1；到不了，就别怪用户眯眼。
