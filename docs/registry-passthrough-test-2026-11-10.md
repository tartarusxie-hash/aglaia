# shadcn registry 自定义字段透传实测记录

> 日期：2026-11-10（Phase 1 验证项，对应规格 §6.3）
> 环境：本机 Node v24.22.1，`npx shadcn@latest`（当时最新版）；本地 registry 以 `python3 -m http.server` 托管在 127.0.0.1:4317。

## 被测对象

一个 registry item `glass-card`（`registry:component`，含一个 tsx 文件），在标准字段之外加了三组自定义字段：`promptFlow`（含 version / targets / verification）、`aglaiaTokens`（blur/opacity/radius）、`aglaia`（platforms/function/granularity）。消费端为最小测试项目，`components.json` 中声明 `"registries": { "@aglaia": "http://127.0.0.1:4317/{name}.json" }`。

## 实测过程与结果

1. **CLI 安装**：`npx shadcn@latest add @aglaia/glass-card --yes`
   - 结果：成功，输出 `✔ Created 1 file: src/components/glass-card.tsx`，退出码 0。带自定义字段的 JSON **没有触发校验错误**（未知字段被容忍）。
   - 但装到消费项目后全盘检索 `promptFlow` / `aglaiaTokens`：**零命中**——自定义字段不落盘、不留痕。
2. **MCP 工具清单**：`npx shadcn@latest mcp`（stdio）→ `tools/list` 返回 7 个工具：get_project_registries / list_items_in_registries / search_items_in_registries / view_items_in_registries / get_item_examples_from_registries / get_add_command_for_items / get_audit_checklist。
3. **MCP 列表/搜索的前置条件**：`list_items_in_registries` 与 `search_items_in_registries` 实际请求的是 `{base}/registry.json?limit=100` 与 `?q=<词>&limit=100`——即注册表基地址**必须同时提供 `registry.json` 索引端点**，只有逐条 `{name}.json` 不够。补上索引文件后，列表与搜索均正常返回该条目。
4. **MCP 返回内容**：list / search 只返回 `name / type / description / add 命令`；`view_items_in_registries` 只返回 name、description、type、文件数。**`promptFlow`、`aglaiaTokens`、`aglaia` 三组自定义字段在任何 MCP 工具的返回中都不出现**——不透传。

## 结论

- 自定义字段放进 registry item **无害**（不破坏 CLI / MCP 兼容），但 shadcn 工具链**不会**把它们暴露给 agent。
- 按规格 §6.3 定式执行：`registry.json` 本体保持规范形状（仅标准字段 + 规格要求的英文 name/description/keywords、四维标签、许可元数据）；全部扩展字段（prompt 流、参数表、验证信息、行为说明等）由旁挂文件 **`registry-ext.json`** 承载，按条目 ID 索引。agent 取 prompt 时走 ext 文件或后续自有 MCP，不依赖 shadcn 透传。
- 构建脚本 `scripts/build-registry.mjs` 已按此实现，并同时产出逐条 `{name}.json` 的数据基础（Phase 2 部署时与索引一并发布）。
