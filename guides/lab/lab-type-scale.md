---
id: "lab-type-scale"
kind: "guide"
guide_type: "lab"
discipline: "visual"
name_zh: "字阶生成：标题不是「调大一点」"
name_en: "Type Scale Lab"
summary_zh: "拖动基准字号，看整组字号如何按 1.25 的比例一起呼吸。"
description: "Interactive type-scale instrument: drag the base size and watch a 1.25-ratio scale (Caption to H1) move together."
keywords: ["type scale", "typography", "modular scale", "visual lab"]
status: "published"
license:
  spdx: "CC-BY-4.0"
  author: "Aglaia"
  source_url: "aglaia.design"
  verified: true
created: "2026-11-10"
updated: "2026-11-10"
---

拖动基准字号，看整组字号如何按 1.25 的比例一起呼吸。

## 行为说明（Phase 2 按此重写代码）

**输入**：基准字号滑杆（13–20px，步进 0.5，默认 16px）。

**计算**：比例固定 1.25（大三度）；六档步进 −1…+4：Caption 辅助（−1）、Body 正文（0）、Lead 导语（+1）、H3 小标题（+2）、H2 标题（+3）、H1 大标题（+4）；字号 = 基准 × 1.25^步进，保留一位小数；预览字号上限钳制在 46px。

**输出**：从 H1 到 Caption 自上而下排列，每行左侧标实际 px 值，右侧以该字号渲染档位名。

**讲解文案**：字阶是一组有比例关系的字号——层级来自比例，不来自随手加粗。
