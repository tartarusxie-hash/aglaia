# Aglaia 账号系统 v1

> 状态：2026-11-16 完成，后端 + 预览部署已验证；等 D1 建库并绑定后
> 才能真正注册/登录。运维步骤（建库、绑定、设 admin）见
> `~/workspace/goals/figma/aglaia-accounts-ops-2026-11-16.md`。

## 架构

- **Cloudflare Pages Advanced Mode**：账号 API 是一个 Worker（`worker/src/`），
  用 esbuild 打包成单文件 `dist/_worker.js`，随静态站一起部署。
- **D1** 存用户与会话（v1 不用 KV，少一个要建的资源）。
- **认证**：邮箱 + 密码（2026-11-16 用户定案；magic link / GitHub OAuth
  留待以后）。v1 **没有邮箱验证**（邮件服务未配，记为已知缺口）。

```
浏览器 ── /api/* ──▶ _worker.js ──▶ D1（变量名 DB）
        └─ 其他 ──▶ worker 内 env.ASSETS.fetch() 回落到静态资源
```

> **实测结论（2026-11-16，preview 探针验证）**：Advanced Mode 下
> `_routes.json` 不会把静态请求挡在 worker 之外——worker 会收到所有
> 请求（探针 worker 对 `GET /` 返回了 418，两种上传格式都一样）。
> 静态页靠 worker 里的 `env.ASSETS.fetch()` 回落，这是官方 Advanced
> Mode 文档规定的做法。`dist/_routes.json` 仍随部署发布（声明意图、
> 将来若改回 `functions/` 模式即生效），但不要指望它省调用次数。
> 代价：每个静态请求也计一次 Functions 调用（免费额度 10 万次/天，
> 本站流量远低于此；项目 `fail_open=true`，额度耗尽时静态页照常 served）。

## 目录

| 路径 | 说明 |
| --- | --- |
| `worker/src/index.js` | Worker 入口：路由 + 全部 API 端点 |
| `worker/src/crypto.js` | PBKDF2 / 会话 token（纯 WebCrypto，Node 测试复用同一份） |
| `worker/src/db.js` | 懒迁移 + 官方账号种子 + user 对象映射 |
| `worker/src/migration-sql.js` | 自动生成（由 `0001_init.sql` 内联），请勿手改 |
| `worker/migrations/0001_init.sql` | DDL 权威来源（users + sessions） |
| `worker/scripts/build-worker.mjs` | 打包：内联 SQL → esbuild → 写 `dist/_worker.js` + `dist/_routes.json` |
| `worker/scripts/gen-official-hash.mjs` | 生成官方账号密码+哈希（已用过，见下） |
| `worker/scripts/bind-d1.py` | 把 D1 绑定到 Pages 项目（等用户给 database id 后执行） |
| `worker/test/` | `node --test` 单元测试（内存 mock D1），17 个用例 |

## 构建与部署

```bash
npm run build          # astro 构建链末尾自动跑 build:worker
npm run build:worker   # 只打包 worker（dist/ 须已存在）
npm run test:worker    # 单元测试：node --test worker/test/api.test.mjs
```

部署用 `~/workspace/custom-connectors/custom.cloudflare/bin/cf_pages_deploy.py`
（已改：`dist/_worker.js` 不进静态 asset，而是包成嵌套 multipart 的
`_worker.bundle` 字段随部署上传；`_routes.json` 仍走特殊文件字段）：

```bash
~/workspace/shot-tools/venv/bin/python \
  ~/workspace/custom-connectors/custom.cloudflare/bin/cf_pages_deploy.py \
  dist 47daeff42661effa7d8c6b77eda93d25 aglaia accounts-v1   # preview 分支
```

**只部署 preview，不要部署生产**——直到 D1 建好并绑定、且预览上
跑通一次真实注册/登录。绑定后必须重新部署一次（绑定只对绑定之后
创建的部署生效）。

## 数据模型（D1）

```sql
users (
  id TEXT PRIMARY KEY,            -- usr_<uuid>，官方账号固定 usr_official
  nickname TEXT NOT NULL,         -- 1–20 字
  email TEXT NOT NULL UNIQUE,     -- 存小写
  password_hash TEXT NOT NULL,    -- pbkdf2$迭代数$salt-b64url$hash-b64url
  avatar_type TEXT DEFAULT 'preset' CHECK (avatar_type IN ('preset','custom')),
  avatar_preset_id TEXT,          -- 预设 id，如 cat-1 / official
  avatar_url TEXT,                -- 自定义头像的 data URL（v1 折中，见下）
  bio TEXT DEFAULT '',
  role TEXT DEFAULT 'user' CHECK (role IN ('user','admin','official')),
  created_at INTEGER NOT NULL     -- Unix 秒
);
sessions (
  id TEXT PRIMARY KEY,            -- 会话 token 的 SHA-256 hex（非明文）
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL
);
```

- **密码**：PBKDF2-HMAC-SHA-256，100,000 次迭代，每用户独立 16 字节
  salt，导出 32 字节。格式 `pbkdf2$100000$<salt>$<hash>`（base64url）。
  密码绝不记日志、绝不返回客户端。
- **迁移**：worker 首次处理需库的 API 请求时执行
  `CREATE TABLE IF NOT EXISTS`（幂等）+ 官方账号种子插入；建库绑定后
  无需手动跑 SQL。`migrations/0001_init.sql` 是备查的 DDL。
- **官方账号**：`official@aglaia.design`，昵称「阿格莱亚」，
  role=official，头像预设 `official`（`/brand/avatars/official.webp`
  由头像组提供）。密码哈希以常量放在 `worker/src/db.js`；
  **明文密码只在 2026-11-16 的交付汇报里出现一次，不进任何文件。**
  轮换密码：把常量改回占位符后重跑 `gen-official-hash.mjs`，再在 D1
  里删掉旧官方账号行（或直接 UPDATE password_hash），重新部署。

## API 契约（前后端共同约定）

基地址同站 `/api`，JSON 交互（头像上传另见下）。所有响应
`Cache-Control: no-store`。错误体：`{error, message, field?}`。

user 对象：`{id, nickname, email, avatar_url, bio, role, created_at}`。
`avatar_url`：预设 → `/brand/avatars/<id>.webp`；自定义 → data URL；
未设置 → `null`（前端用默认头像兜底）。`created_at` 为 ISO 8601。

会话 Cookie：`aglaia_session`，HttpOnly、Secure、SameSite=Lax、
Path=/、Max-Age 30 天；服务端会话记录带过期时间，登出即删。

| 方法与路径 | 请求 | 成功 | 失败 |
| --- | --- | --- | --- |
| POST `/api/auth/register` | `{nickname, email, password, password_confirm, avatar_preset_id?}` | 201 `{user}` + Cookie | 400 校验（`field` 指明字段）、409 邮箱已注册 |
| POST `/api/auth/login` | `{email, password}` | 200 `{user}` + Cookie | 401（邮箱不存在与密码错误同一条响应，不区分） |
| POST `/api/auth/logout` | — | 200 `{ok:true}` + 清 Cookie | —（无 Cookie 也是 200） |
| GET `/api/auth/me` | — | 200 `{user}` | 401 未登录 |
| PATCH `/api/account/profile` | `{nickname?, bio?}` | 200 `{user}` | 401；400 校验 |
| POST `/api/account/avatar` | JSON `{avatar_preset_id}` 或 multipart `file` | 200 `{user}` | 401；400 图片非法；413 超 2MB |
| POST `/api/account/password` | `{current_password, new_password, new_password_confirm}` | 200 `{ok:true}` | 401 当前密码错；400 校验 |
| GET `/api/admin/users?page=&limit=` | — | 200 `{total, page, limit, users[]}`（limit 最大 100） | 401 未登录；403 非 admin |

头像上传：只收 JPG/PNG/WebP，≤2MB，**只认文件魔数**（不信扩展名
与客户端 MIME）。v1 折中：服务端不裁剪/缩放，直接存原图 data URL
到 D1 TEXT，前端用 CSS 圆形裁剪显示；R2 迁移与服务端裁剪以后做。

速率限制 v1：内存滑动窗口（每 isolate 独立）——登录 10 次/10 分钟/IP，
注册 5 次/小时/IP，超限 429。局限：多 isolate 下限额分摊、isolate
回收后清零，只能挡随手刷的脚本；v2 应改 D1 表或 Cloudflare
Rate Limiting 规则。

未绑定 D1 时：需库的接口返回 **503 `{error:"db_unavailable"}`**
（不是 500）；无 Cookie 的 `GET /api/auth/me` 直接返回 401，
无 Cookie 的 logout 直接返回 200（无需查库即可判定）。

## 已知缺口（v1）

1. 无邮箱验证（邮件服务未配）：任何邮箱都能注册，含他人邮箱。
2. 无 passkey 二次验证（Enargeon 后台有；Aglaia v1 不做）。
3. 自定义头像存 D1 data URL（占行体积、无 CDN 缓存、无服务端裁剪）。
4. 速率限制是内存级、每 isolate 独立（见上）。
5. 无找回密码流程（无邮件服务的前提下无法做）。
6. 预设头像 id 目前只做格式校验（`^[A-Za-z0-9][A-Za-z0-9_-]{0,31}$`），
   不校验文件是否存在——头像组提供 `public/brand/avatars/*.webp` 后，
   前后端再对齐一份预设清单。
