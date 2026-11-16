# Aglaia · 阿格莱亚

**aglaia.design** —— 给「想让 AI 帮自己做设计的人」的设计知识与素材站。

你不需要会 Figma，不需要懂设计术语：查到一个组成部分叫什么、拿到一条能直接喂给 agent 的 prompt、点开一个效果亲眼看它动起来，就能让 AI 按你的想法生成网站或 App 的界面。

本站是「开源免费 Figma」项目的落地形态，由三部分组成：

1. **词典（组件索引）**：网站 / App 的每个组成部分叫什么、长什么样、放在哪、干什么用。
2. **弹药库（prompt 库 + 效果库）**：每个组成部分对应一条已验证、可复用的 agent 生成 prompt；效果能点开看、能复制代码。
3. **工作台入口**：网页版工作台的家（v1 为入口页 + 实时预览沙箱，编辑器能力分期接入）。

## 治理承诺：免费核心永久免费

- **免费核心永久免费**：资源库的绝大部分内容（组件、效果、提示词、艺术风格、字体、学习资料）永久免费，不设付费墙；已经免费的内容永远不会变成付费。
- **创作者市场（筹备中）**：创作者可以在市场上架自己的付费作品（特效、UI/UX 作品等），自己定价，平台只收服务费（草案 10%，未定稿），不买断、不独占。
- 入库内容只收开放许可且可再分发者，逐条标注 SPDX 许可 + 作者 + 来源 URL；许可未核实的条目不上站。
- 红线：Apple 官方 UI kit 与 SF Pro 绝不打包内置；鸿蒙官方资源未获书面许可前不内置；GSAP 不内嵌。

## 许可

- 本仓库的代码（站点、构建脚本、worker）以 **MIT** 许可发布，见 [LICENSE](LICENSE)。
- `content/` 下的原创内容（组件条目、提示词、艺术风格介绍等）以 **CC BY 4.0** 许可发布，使用时请署名阿格莱亚并附链接。第三方素材保留各自原许可，见各条目中的标注。

## 内容即数据：一份注册表驱动全站

全站只有一个数据源 —— **内容注册表（registry）**。组件索引、prompt 库、效果库、学习区、工作台都是它的视图。内容以结构化文件存放在本仓库（Markdown 正文 + YAML frontmatter，一文件一条目），不用数据库；构建时由 `scripts/build-registry.mjs` 汇总生成 `registry.json`（shadcn registry 兼容形状），供站点与 agent / MCP 检索取用。

### 目录结构

```
content/
  patterns/    模式（术语与分类节点，32 个起步）
  entries/     组件 / 模板 / 资产条目（索引的原子）
  prompts/     prompt 流（七段式，见 docs/schema.md）
  scenes/      场景（场景级组合 prompt）
  effects/     效果条目（可预览，含预览代码与参数表）
  resources/   外部资源引用（开源项目 / 规范 / 工具，外链 + 许可）
guides/
  disciplines/ 学科导览（ui / motion / interaction / visual 四篇）
  principles/  原则速查（每条原则一个 Guide 条目）
  lab/         动手实验室（仪器条目：内容 + 行为说明，代码 Phase 2 重写）
  checklist.md 评审清单与书单
tokens/
  tokens.json  全站设计令牌（W3C DTCG 格式）
scripts/
  build-registry.mjs   条目文件 → registry.json 构建脚本
docs/
  schema.md    条目文件格式（已冻结，Phase 1）
dist/
  registry.json / registry-ext.json  构建产物（脚本生成，勿手改）
```

### 条目格式摘要（全文见 docs/schema.md）

- ID：全站唯一、小写连字符（如 `bottom-tab-bar`）、永不复用。
- 四维标签必填：平台（≥1）× 主功能（恰好 1）× 位置（≥1）× 粒度（恰好 1），外加内容类型（恰好 1）。
- 中英双名 + 双语一句话说明必填；英文 `description` / `keywords` 必填（供站内搜索与 MCP 检索）。
- 许可元数据必填且机器可读：SPDX 标识 + 作者 + 来源 URL。
- prompt 流必填验证字段：最后验证模型、验证日期、验证人、验证结论。

## 当前进度

- Phase 0 规格确认：已完成（规格：`aglaia-spec-ia-2026-11-10`，在目标工作区）。
- Phase 1 数据与种子：进行中 —— schema 已冻结（`docs/schema.md`）；第 0 批（静态「UI/UX 设计资源库」迁移）已入库；TokenSet v1 已建立；registry.json 已可构建。
- Phase 2 站点开发：未开始（本仓库暂不含网站代码）。

## 投稿

正式上线后才开放 GitHub PR 投稿（先打基础，再拓展）。投稿须按 `docs/schema.md` 的入库 checklist 打标签并附许可元数据。
