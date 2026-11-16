# 内容条目文件格式（Schema）· v1 已冻结

> 冻结日期：2026-11-10（Phase 1）
> 依据：《aglaia.design 完整规格与信息架构》§4 分类法、§4.6 入库规则、§5 prompt 库设计、§6 数据模型。
> 本文件是条目格式的唯一权威定义。格式变更须走版本修订并批量迁移，不静默改义（规格 §4.6 规则 6）。

## 1. 总原则

- **一文件一条目**：Markdown 正文 + YAML frontmatter。frontmatter 是机器可读的注册表字段，正文是给人读的内容。
- **存放位置按实体分目录**：`content/patterns/`、`content/entries/`、`content/prompts/`、`content/scenes/`、`content/effects/`、`content/resources/`、`guides/disciplines/`、`guides/principles/`、`guides/lab/`。
- **文件名 = 条目 ID**：`<id>.md`，如 `content/entries/bottom-tab-bar.md`。
- **ID 规则**：全站唯一；小写字母、数字与连字符（kebab-case）；永不复用、永不改名（改名等于新条目 + 旧条目标 deprecated）。
- 构建：`scripts/build-registry.mjs` 扫描全部内容文件，汇总为 `dist/registry.json`（shadcn registry 兼容形状）+ `dist/registry-ext.json`（扩展字段旁挂，见 §9）。

## 2. 通用字段（所有实体必填，除非注明）

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | string | 条目 ID，与文件名一致 |
| `kind` | enum | 实体类型：`pattern` / `entry` / `prompt` / `scene` / `effect` / `resource` / `guide` / `token-set` |
| `name_zh` | string | 中文名 |
| `name_en` | string | 英文名 |
| `summary_zh` | string | 中文一句话说明（大白话，给小白看） |
| `description` | string | 英文一句话说明（机器可读，供 MCP / 搜索） |
| `keywords` | string[] | 英文关键词（供 MCP / 搜索检索） |
| `status` | enum | `draft`（草稿，不上站）/ `published`（已发布）/ `stale`（待复验，仅 prompt）/ `deprecated`（已下线保留） |
| `license` | object | 许可元数据，见 §3 |
| `created` | date | 入库日期 `YYYY-MM-DD` |
| `updated` | date | 最后修改日期 |

## 3. 许可元数据（license，必填且机器可读）

```yaml
license:
  spdx: CC-BY-4.0        # SPDX 标识；站内自产内容默认 CC-BY-4.0（内容）/ MIT（代码）
  author: Aglaia         # 作者 / 权利方
  source_url: https://…  # 来源 URL；自产内容填仓库内路径或本站 URL
  verified: true         # 是否已打开 LICENSE 原文复核；false 的条目只能是 draft
```

规则：`verified: false` 的条目**不得** `published`（规格 §4.6 规则 3）。Apple 官方 kit / SF Pro、来源不明的鸿蒙资源**不得入库**，只能以 Resource 条目外链引用并标注「仅参考、不打包」。

## 4. 四维标签（Entry / Effect / Scene / Resource 必填）

| 字段 | 类型 | 取值 |
|---|---|---|
| `platforms` | string[]，≥1 | `web` / `web-mobile` / `ios` / `android` / `harmonyos` / `desktop` / `tablet` / `all` |
| `function` | string，恰好 1（主功能）；`function_secondary` 可加副功能 | 16 个功能组之一：`navigation` 导航 / `onboarding` 引导与入门 / `account` 身份与账号 / `content` 内容组织 / `search` 搜索与筛选 / `form` 表单与输入 / `commerce` 交易 / `personal` 个人空间 / `data` 数据与工作 / `marketing` 营销与内容 / `feedback` 状态与反馈 / `overlay` 浮层 / `media` 媒体 / `motion` 动效与背景 / `theming` 主题与令牌 / `assets` 基础资产 |
| `placements` | string[]，≥1 | `status-area` 顶部状态区 / `top-nav` 顶部导航 / `bottom-tab` 底部标签栏 / `bottom-sheet` 底部弹层 / `sidebar-left` 左侧栏/抽屉 / `sidebar-right` 右侧栏 / `content-area` 内容区 / `floating` 悬浮元素 / `overlay` 浮层 / `full-screen` 全屏 / `inline` 行内 / `na` 不适用（资产/令牌类） |
| `granularity` | string，恰好 1 | `token` / `component` / `block` / `page` / `flow` / `effect` |
| `type` | string，恰好 1 | `component` / `template` / `effect` / `prompt` / `asset` / `token-set` / `guide` / `resource` |

Guide 实体（学科 / 原则 / 仪器 / 清单）豁免四维标签，改用 `discipline` 字段（见 §8）。

## 5. Pattern（模式）字段

| 字段 | 说明 |
|---|---|
| `function_group` | 所属功能组（§4 的 16 组之一） |
| `definition_zh` | 大白话定义（这个模式是什么） |
| `misconceptions_zh` | 常见误区（正文可展开，frontmatter 存一句话版） |

模式不得随手新建：先归入既有 32 模式；确需新增走一次分类评审并登记（规格 §4.6 规则 5）。

## 6. Entry（条目）字段

| 字段 | 说明 |
|---|---|
| `pattern` | 主模式 ID（必填）；`patterns_secondary` 副模式 ID 列表（可选） |
| `preview` | 预览图相对路径（可选；Phase 2 补图） |
| `prompts` | 关联的组件级 prompt 流 ID 列表；无则填空数组并在正文标注「prompt 待补」（规格 §4.6 规则 4） |
| `effects` | 可用效果 ID 列表（可选） |
| `resources` | 参考实现 Resource ID 列表（可选） |

正文结构（T3 模板）：大白话说明 → 什么时候用 / 不用 → 细节与变体 → 相关条目。

## 7. PromptFlow（prompt 流）字段

| 字段 | 说明 |
|---|---|
| `level` | `component`（组件级，原子）/ `scene`（场景级，组合） |
| `entry` | 组件级必填：关联的 Entry ID |
| `version` | SemVer，如 `1.0.0`；改 prompt 必升版本并在正文写一行变更说明 |
| `targets` | 框架目标数组：`html-css` / `tailwind` / `react`（v1 三档） |
| `parameters` | 参数表数组，每项：`name`（`{{token-name}}` 小写连字符）/ `type`（length/color/percent/enum/text）/ `default` / `range` / `unit`。参数表三处共用：prompt 占位符 = 效果预览滑杆 = 工作台属性面板 |
| `verification` | 验证四字段（必填，进注册表）：见下 |
| `code_ref` | 该版本生成的参考代码相对路径（与 prompt 同版本、分开存；可选） |

```yaml
verification:
  last_verified_model: ""   # 如实填写；未验证填空字符串且 status 必须为 draft 或 stale
  last_verified_date: ""    # YYYY-MM-DD
  verified_by: ""
  result: ""                # passed-first-try 一次通过 / passed-after-adjustment 调整后通过
```

**七段式正文**（正文固定小节，顺序不可变）：`## 角色 Role`、`## 任务 Task`、`## 效果描述 Description`、`## 设计 Tokens`、`## 约束 Constraints`、`## 框架目标 Target`、`## 输出格式 Output`。全站通用令牌引用写 `{{token:color/primary}}` 形式，与条目私有参数区分。

## 8. Scene / Effect / Resource / Guide 字段

**Scene**：`refs`（引用的 PromptFlow 列表，每项 `prompt` ID + `version` + `overrides` 覆盖参数对象）、`entries`（关联 Entry ID 列表）、`layout_zh`（版式描述）。场景 prompt 不复制组件 prompt 全文，只引用 + 覆盖（规格 §5.1）。

**Effect**（Entry 子类型，文件放 `content/effects/`）：
| 字段 | 说明 |
|---|---|
| `preview_code` | 预览代码文件相对路径（HTML/CSS，Phase 2 随站点补） |
| `parameters` | 参数表，与关联 prompt 同源（同 §7 定义） |
| `code_targets` | 代码档：`html-css` / `tailwind` |
| `applies_to` | 可修饰的 Entry ID 列表 |

**Resource**：
| 字段 | 说明 |
|---|---|
| `url` | 外部链接（必填） |
| `usage` | 工作台用法标签：`reference` 仅参考 / `template` 模板 / `library` 组件库 / `tool` 工具 / `spec` 规范 |
| `reference_only` | bool；规范/文档类（如 Apple HIG）为 true，含义「仅参考外链、不打包」 |
| `patterns` / `entries` | 关联的模式 / 条目 ID 列表（可选） |

**Guide**：
| 字段 | 说明 |
|---|---|
| `discipline` | `ui` / `motion` / `interaction` / `visual`（学科四分法） |
| `guide_type` | `discipline` 学科导览 / `principle` 原则 / `lab` 仪器 / `checklist` 清单 |
| `group` | 原则分组（仅 principle）：`nielsen` / `laws-of-ux` / `gestalt` |
| `behavior` | 仪器行为说明（仅 lab）：输入、计算、输出的行为描述；代码 Phase 2 按此重写 |
| `related` | 关联 Pattern / Entry ID 列表（可选，接解释层） |

## 9. registry.json 与扩展字段

- `registry.json`：shadcn registry 兼容形状（`$schema` / `name` / `homepage` / `items[]`），每 item 至少含 `name`（= 条目 ID）、`type`、`title`、`description`、`keywords` 及四维标签与许可元数据。
- **自定义字段（`promptFlow` / `tokens` 等）能否被 shadcn 工具链透传：Phase 1 实测项**（见 Phase 1 报告）。无论实测结果如何，构建脚本**同时**输出旁挂文件 `registry-ext.json` 承载全部扩展字段（按条目 ID 索引），registry 本体保持规范纯净（规格 §6.3 定式）。

## 10. 入库 checklist（发布前逐项过，规格 §4.6）

1. 四维必填齐全（Guide 豁免，改查 discipline / guide_type）。
2. 中英双名 + 双语一句话 + 英文 description / keywords 齐全。
3. 许可元数据齐全且 `verified: true`（打开 LICENSE 原文复核过）。
4. 组件条目至少关联 1 条 prompt，或正文标注「prompt 待补」。
5. 新模式已走分类评审（或归入既有 32 模式）。
6. prompt 流：七段齐全、参数表完整、验证四字段如实填写（未验证不得 published）。
