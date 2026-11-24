// 内存版 D1 mock：实现 worker 用到的 prepare/bind/first/all/run/exec
// 子集，按 SQL 前缀分发到内存 Map。只覆盖 worker 实际发出的查询形状
// （见 src/index.js 与 src/db.js）；新增查询时这里要同步加分支，
// 否则测试会抛 "unsupported SQL"——这是故意的，防止静默假通过。
//
// 注意：迁移 DDL 走 prepare().run() 逐条执行（真实 D1 的 exec() 会按行
// 切分，多行 CREATE TABLE 会失败，见 src/db.js 的注释）。mock 的 exec()
// 保留但 worker 不再用它跑迁移——不要把 exec 当成迁移的验证手段。
//
// 用法：const db = new MockD1(); const env = { DB: db };
// 测试可直接读写 db.users / db.sessions 做断言与状态操纵
// （例如把会话改过期）。

function normalize(sql) {
  return sql.replace(/\s+/g, " ").trim().toLowerCase();
}

export class MockD1 {
  constructor() {
    this.users = new Map(); // id -> row
    this.usersByEmail = new Map(); // email -> id
    this.sessions = new Map(); // id -> row
    this.execCalls = [];
    this.ddlCalls = []; // ensureDb 逐条跑的迁移 DDL（CREATE TABLE / CREATE INDEX）
  }

  async exec(sql) {
    this.execCalls.push(sql);
    return { success: true };
  }

  prepare(sql) {
    const q = normalize(sql);
    const db = this;
    // 真实 D1 的 PreparedStatement 本身就有 first/all/run（无参查询
    // 不必先 bind），mock 保持同一形状。
    const stmt = {
      bind(...params) {
        return {
          async first() {
            return db._first(q, params);
          },
          async all() {
            return { results: db._all(q, params) };
          },
          async run() {
            return db._run(q, params);
          },
        };
      },
      async first() {
        return db._first(q, []);
      },
      async all() {
        return { results: db._all(q, []) };
      },
      async run() {
        return db._run(q, []);
      },
    };
    return stmt;
  }

  _userById(id) {
    const row = this.users.get(id);
    return row ? { ...row } : null;
  }

  _userByEmail(email) {
    const id = this.usersByEmail.get(email);
    return id ? this._userById(id) : null;
  }

  _first(q, p) {
    if (q.startsWith("select id from users where email = ?")) {
      const u = this._userByEmail(p[0]);
      return u ? { id: u.id } : null;
    }
    if (q.startsWith("select id, nickname, email, password_hash") && q.includes("where email = ?")) {
      return this._userByEmail(p[0]);
    }
    if (q.startsWith("select id, nickname, email, avatar_type") && q.includes("where id = ?")) {
      return this._userById(p[0]);
    }
    if (q.startsWith("select nickname, bio from users where id = ?")) {
      const u = this._userById(p[0]);
      return u ? { nickname: u.nickname, bio: u.bio } : null;
    }
    if (q.startsWith("select password_hash from users where id = ?")) {
      const u = this._userById(p[0]);
      return u ? { password_hash: u.password_hash } : null;
    }
    if (q.startsWith("select user_id, expires_at from sessions where id = ?")) {
      const s = this.sessions.get(p[0]);
      return s ? { user_id: s.user_id, expires_at: s.expires_at } : null;
    }
    if (q.startsWith("select count(*) as total from users")) {
      return { total: this.users.size };
    }
    throw new Error(`MockD1: unsupported SELECT: ${q}`);
  }

  _all(q, p) {
    if (q.startsWith("select id, nickname, email, avatar_type") && q.includes("order by created_at desc")) {
      const [limit, offset] = p;
      const rows = [...this.users.values()]
        .sort((a, b) => b.created_at - a.created_at)
        .slice(offset, offset + limit)
        .map((u) => ({ ...u }));
      return rows;
    }
    throw new Error(`MockD1: unsupported SELECT (all): ${q}`);
  }

  _run(q, p) {
    // 迁移 DDL：CREATE TABLE / CREATE INDEX（mock 不建真实表，只记调用）
    if (q.startsWith("create table if not exists") || q.startsWith("create index if not exists")) {
      this.ddlCalls.push(q);
      return { success: true, meta: { changes: 0 } };
    }
    // 官方账号种子：INSERT ... SELECT ... WHERE NOT EXISTS
    if (q.startsWith("insert into users") && q.includes("where not exists")) {
      const [id, nickname, email, passwordHash, presetId, now, emailCheck] = p;
      if (!this.usersByEmail.has(emailCheck)) {
        const row = {
          id, nickname, email, password_hash: passwordHash,
          avatar_type: "preset", avatar_preset_id: presetId, avatar_url: null,
          bio: "", role: "official", created_at: now,
        };
        this.users.set(id, row);
        this.usersByEmail.set(email, id);
        return { success: true, meta: { changes: 1 } };
      }
      return { success: true, meta: { changes: 0 } };
    }
    if (q.startsWith("insert into users")) {
      const [id, nickname, email, passwordHash, avatarType, presetId, avatarUrl, bio, role, createdAt] = p;
      const row = {
        id, nickname, email, password_hash: passwordHash,
        avatar_type: avatarType, avatar_preset_id: presetId, avatar_url: avatarUrl,
        bio, role, created_at: createdAt,
      };
      this.users.set(id, row);
      this.usersByEmail.set(email, id);
      return { success: true, meta: { changes: 1 } };
    }
    if (q.startsWith("insert into sessions")) {
      const [id, userId, expiresAt, createdAt] = p;
      this.sessions.set(id, { id, user_id: userId, expires_at: expiresAt, created_at: createdAt });
      return { success: true, meta: { changes: 1 } };
    }
    if (q.startsWith("delete from sessions where id = ?")) {
      const deleted = this.sessions.delete(p[0]);
      return { success: true, meta: { changes: deleted ? 1 : 0 } };
    }
    if (q.startsWith("delete from sessions where user_id = ? and expires_at < ?")) {
      let n = 0;
      for (const [id, s] of this.sessions) {
        if (s.user_id === p[0] && s.expires_at < p[1]) {
          this.sessions.delete(id);
          n++;
        }
      }
      return { success: true, meta: { changes: n } };
    }
    if (q.startsWith("delete from sessions where user_id = ? and id != ?")) {
      let n = 0;
      for (const [id, s] of this.sessions) {
        if (s.user_id === p[0] && id !== p[1]) {
          this.sessions.delete(id);
          n++;
        }
      }
      return { success: true, meta: { changes: n } };
    }
    if (q.startsWith("update users set nickname = ?, bio = ? where id = ?")) {
      const u = this.users.get(p[2]);
      if (u) {
        u.nickname = p[0];
        u.bio = p[1];
      }
      return { success: true, meta: { changes: u ? 1 : 0 } };
    }
    if (q.startsWith("update users set avatar_type = ?, avatar_preset_id = ?, avatar_url = ? where id = ?")) {
      const u = this.users.get(p[3]);
      if (u) {
        u.avatar_type = p[0];
        u.avatar_preset_id = p[1];
        u.avatar_url = p[2];
      }
      return { success: true, meta: { changes: u ? 1 : 0 } };
    }
    if (q.startsWith("update users set password_hash = ? where id = ?")) {
      const u = this.users.get(p[1]);
      if (u) u.password_hash = p[0];
      return { success: true, meta: { changes: u ? 1 : 0 } };
    }
    throw new Error(`MockD1: unsupported statement: ${q}`);
  }
}
