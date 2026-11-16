// 生成 content/entries/*.md（37）、content/prompts/<entry>-prompt.md（37，七段式）、
// content/scenes/*.md（10，引用组合）。数据：gen-entries-data.mjs。
import { writeFileSync, mkdirSync } from "node:fs";
import { ENTRIES } from "./gen-entries-data.mjs";
import { S, FLOW, licenseLines, verificationLines, fmFile, SELF_LICENSE } from "./yaml.mjs";

const CB = "- " + String.fromCharCode(91, 32, 93) + " ";
const PH = (t) => "\u3010" + t + "\u3011";
const TOKENS_LINE = "颜色 {{token:color/primary}}、{{token:color/ink/primary}}、{{token:color/ink/secondary}}、{{token:color/surface}}、{{token:color/line}}；圆角 {{token:radius/md}}；间距 8pt 体系 {{token:spacing/4}}；字阶正文 {{token:font/size/body}}；动效 {{token:motion/duration/normal}} + {{token:motion/easing/ease-out-expo}}。以上令牌替换为我项目自己的变量也可，保持层级关系不变。";

function schemaParams(params) {
  return params.map(([name, type, def, range, unit]) => ({ name: "{{" + name + "}}", type, default: def, range, unit }));
}

function entryBody(e) {
  const zh = e[1], what = e[10], when = e[11], avoid = e[12], details = e[13], effects = e[14];
  const lines = [
    "## 大白话说明", "", what, "",
    "## 什么时候用", "", when, "",
    "## 什么时候不用", "", avoid, "",
    "## 细节与变体", "",
    ...details.map((x) => "- " + x), "",
  ];
  if (effects.length) lines.push("配套效果见下方「可用效果」。", "");
  return lines.join("\n");
}

function promptBody(e) {
  const zh = e[1], sumZh = e[7], params = e[9], what = e[10], when = e[11], avoid = e[12], details = e[13];
  const rows = params.map(([n, t, d, r]) => "| {{" + n + "}} | " + t + " | " + d + " | " + r + " |").join("\n");
  return [
    "## 角色 Role", "",
    "你是一名资深产品设计师兼前端工程师，深谙移动与 Web 界面规范，输出的设计克制、标准、可直接开发。", "",
    "## 任务 Task", "",
    "为我生成一个「" + zh + "」组件。用途：" + sumZh + "使用场景：" + when, "",
    "## 效果描述 Description", "",
    what, "",
    "细节要求：", ...details.map((x) => "- " + x), "",
    "## 设计 Tokens", "",
    TOKENS_LINE, "",
    "本组件参数（在参数范围内取值，我没指定时用默认）：", "",
    "| 参数 | 类型 | 默认 | 范围 |", "|---|---|---|---|", rows, "",
    "## 约束 Constraints", "",
    "- 不要这样做：" + avoid, "",
    "- 触控目标至少 44×44（Web 鼠标场景至少 24px），正文不小于 14px；",
    "- 颜色对比满足 WCAG AA（正文 ≥4.5:1）；状态不能只靠颜色区分；",
    "- 文案用我给的真实内容占位：" + PH("在此粘贴真实文案，如标题、按钮字") + "，不要用 Lorem ipsum；",
    "- 只实现这一个组件，不要顺带生成整页或其他组件。", "",
    "## 框架目标 Target", "",
    PH("html-css / tailwind / react，三选一，默认 html-css"), "",
    "## 输出格式 Output", "",
    "输出完整可运行代码，并逐项自检：", "",
    CB + "结构与「效果描述」一致，参数与参数表一致；",
    CB + "包含默认 / 悬停 / 按下 / 禁用等必要状态；",
    CB + "键盘可达，焦点样式可见；",
    CB + "在 375px 宽移动屏与 1440px 桌面屏下都不溢出、不重叠。", "",
    "（验证状态：待复验。本条提示词尚未经真实模型实测，验证字段如实留空。）",
  ].join("\n");
}

mkdirSync("content/entries", { recursive: true });
mkdirSync("content/prompts", { recursive: true });
mkdirSync("content/scenes", { recursive: true });

for (const e of ENTRIES) {
  const [id, zh, en, pattern, platforms, fn, placements, sumZh, descEn, params, , , , , effects, resources] = e;
  const promptId = id + "-prompt";
  const lines = [
    "id: " + S(id), "kind: " + S("entry"), "type: " + S("component"),
    "name_zh: " + S(zh), "name_en: " + S(en),
    "summary_zh: " + S(sumZh), "description: " + S(descEn),
    "keywords: " + FLOW([en.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(), "component", fn]),
    "platforms: " + FLOW(platforms), "function: " + S(fn), "placements: " + FLOW(placements),
    "granularity: " + S("component"),
    "status: " + S("published"),
    ...licenseLines(SELF_LICENSE),
    "pattern: " + S(pattern),
    "prompts: " + FLOW([promptId]),
    "effects: " + FLOW(effects),
    "resources: " + FLOW(resources),
    "created: " + S("2026-11-10"), "updated: " + S("2026-11-10"),
  ];
  writeFileSync("content/entries/" + id + ".md", fmFile(lines, entryBody(e)));

  const plines = [
    "id: " + S(promptId), "kind: " + S("prompt"), "type: " + S("prompt"),
    "name_zh: " + S(zh + " · 提示词"), "name_en: " + S(en + " Prompt"),
    "summary_zh: " + S("生成「" + zh + "」的填空式提示词"),
    "description: " + S("Fill-in prompt that generates a " + en + " component"),
    "keywords: " + FLOW(["prompt", "component", id]),
    "platforms: " + FLOW(platforms), "function: " + S(fn), "placements: " + FLOW(placements),
    "granularity: " + S("component"),
    "status: " + S("stale"),
    ...licenseLines(SELF_LICENSE),
    "level: " + S("component"),
    "entry: " + S(id),
    "version: " + S("1.0.0"),
    "targets: " + FLOW(["html-css", "tailwind", "react"]),
    "parameters: " + FLOW(schemaParams(params)),
    ...verificationLines(),
    "created: " + S("2026-11-10"), "updated: " + S("2026-11-10"),
  ];
  writeFileSync("content/prompts/" + promptId + ".md", fmFile(plines, promptBody(e)));
}

// —— 场景（10）：引用组件 prompt + 覆盖参数，不复制全文（规格 §5.1）——
// [id, zh, en, summary_zh, desc_en, entries[], refs[[promptId, overrides]], layout_zh, fn, platforms]
const SCENES = [
  ["scene-auth-flow", "登录注册流程", "Sign-in / Sign-up Flow", "从打开 App 到登录成功的一整套：登录表单 + 输入规范 + 结果反馈。", "The full sign-in flow: login form, field rules, and result feedback.", ["login-form", "text-field", "toast"],
    [["login-form-prompt", {}], ["text-field-prompt", {}], ["toast-prompt", { "{{position}}": "顶部居中" }]],
    "整屏单列：顶部品牌区（Logo + 一句欢迎），中部登录表单，第三方登录在分隔线下方，协议勾选贴表单底部；登录成功用 Toast 回执并跳转首页，失败在字段下方报错，不弹 Toast。", "account", ["ios", "android", "harmonyos", "web"]],
  ["scene-app-core", "App 三屏骨架（首页+列表+详情）", "App Three-Screen Skeleton", "移动 App 最常见的三屏：底部标签栏框架 + 列表首页 + 内容详情。", "The classic three-screen app skeleton: tab bar shell, list home, content detail.", ["mobile-tab-bar", "list-item", "detail-hero", "card-basic"],
    [["mobile-tab-bar-prompt", {}], ["list-item-prompt", {}], ["detail-hero-prompt", {}], ["card-basic-prompt", {}]],
    "全局框架：底部标签栏常驻 4 个入口。首页为列表（列表行 + 穿插卡片），点任意行进详情页：头图区在上、正文滚动、底部操作条吸底；返回保留列表滚动位置。", "content", ["ios", "android", "harmonyos"]],
  ["scene-shop-home", "商城首页", "Shop Home", "电商 App 首页：搜索、轮播、商品瀑布与底部导航的完整组合。", "An e-commerce home: search bar, carousel, product masonry, and bottom tabs.", ["search-bar", "image-carousel", "product-card", "masonry-grid", "mobile-tab-bar"],
    [["search-bar-prompt", {}], ["image-carousel-prompt", { "{{autoplay}}": "自动（可暂停）" }], ["product-card-prompt", {}], ["masonry-grid-prompt", {}], ["mobile-tab-bar-prompt", {}]],
    "自上而下单列滚动：搜索框吸顶 → 轮播（≤5 张）→ 快捷分类一行 → 商品瀑布流；底部标签栏常驻，购物车标签带角标。", "commerce", ["ios", "android", "harmonyos", "web-mobile"]],
  ["scene-checkout", "结算流程", "Checkout Flow", "从购物车到下单成功：条目确认、结算表单、步骤指示与结果反馈。", "From cart to order placed: cart items, checkout form, step indicator, result feedback.", ["cart-item", "checkout-form", "toast"],
    [["cart-item-prompt", {}], ["checkout-form-prompt", {}], ["toast-prompt", { "{{with-action}}": "纯提示" }]],
    "两页一回执：购物车页（条目列表 + 底部合计条）→ 结算页（地址、商品确认、优惠、支付方式自上而下，提交按钮带总价）→ 下单成功 Toast + 订单详情入口。", "commerce", ["all"]],
  ["scene-onboarding-flow", "新手引导流程", "Onboarding Flow", "首启三屏引导 + 登录的完整首访路径，讲完价值再要账号。", "First-run path: three onboarding screens into sign-in — value first, account second.", ["onboarding-carousel", "login-form"],
    [["onboarding-carousel-prompt", {}], ["login-form-prompt", { "{{methods}}": "验证码 + 第三方" }]],
    "全屏轮播 3 屏（可跳过）→ 最后一屏按钮进登录页；登录成功直达首页，引导只在首启出现一次，版本号变更时可重现。", "onboarding", ["ios", "android", "harmonyos"]],
  ["scene-profile-center", "个人中心", "Profile Center", "「我的」整页：头部资料、通知入口与设置列表的标准组合。", "The full Me page: profile header, notification entry, and settings list.", ["profile-header", "notification-list", "settings-list"],
    [["profile-header-prompt", {}], ["settings-list-prompt", {}], ["notification-list-prompt", {}]],
    "单列滚动：头部（头像/昵称/数据行）→ 订单与资产快捷入口一行 → 设置分组列表；通知入口在头部右上角带角标，通知列表为独立页。", "personal", ["ios", "android", "harmonyos", "web"]],
  ["scene-admin-dashboard", "后台仪表盘", "Admin Dashboard", "管理后台首页：侧边导航 + 指标卡组 + 数据表格的经典三件套。", "The admin home trio: sidebar navigation, stat cards, and a data table.", ["drawer-nav", "dashboard-cards", "data-table", "top-app-bar"],
    [["drawer-nav-prompt", {}], ["dashboard-cards-prompt", {}], ["data-table-prompt", {}], ["top-app-bar-prompt", {}]],
    "左导航常驻（可折叠），右区顶部应用栏（标题 + 搜索 + 账号），内容区第一行 4 张指标卡，第二行数据表格占满剩余高度，表格底部分页。", "data", ["web", "desktop"]],
  ["scene-landing-page", "产品落地页", "Product Landing Page", "官网落地页整页：页眉、Hero、定价表的转化三段式。", "A full landing page: header, hero, and pricing — the conversion trio.", ["web-header", "hero-section", "pricing-table"],
    [["web-header-prompt", {}], ["hero-section-prompt", {}], ["pricing-table-prompt", {}]],
    "页眉吸顶；Hero 左文右图、主 CTA 唯一；中段可插特性与评价（复用卡片组件）；定价表三档居中推荐；页脚收尾再放一个 CTA。", "marketing", ["web"]],
  ["scene-settings-page", "设置页", "Settings Page", "完整设置页：分组列表与开关行的组合，含危险区。", "A complete settings page: grouped lists and switch rows, with a danger zone.", ["settings-list", "switch-row", "list-item"],
    [["settings-list-prompt", {}], ["switch-row-prompt", {}], ["list-item-prompt", {}]],
    "单列分组：账号组（列表行进二级页）、通知组（开关行即时生效）、通用组、关于组；退出登录与注销账号沉底分开放置，注销红色并二次确认。", "personal", ["all"]],
  ["scene-content-detail", "内容详情页", "Content Detail Page", "文章/内容详情整页：顶栏、头图区、正文与底部操作弹层。", "A full content detail page: app bar, hero block, body, and a bottom-sheet action menu.", ["top-app-bar", "detail-hero", "bottom-sheet"],
    [["top-app-bar-prompt", {}], ["detail-hero-prompt", {}], ["bottom-sheet-prompt", {}]],
    "顶部应用栏（返回/标题/分享）；头图区后接正文；点分享升起底部分享弹层；底部操作条吸底（收藏 + 评论入口）。", "content", ["ios", "android", "harmonyos", "web"]],
];

for (const [id, zh, en, sumZh, descEn, entryIds, refs, layout, fn, platforms] of SCENES) {
  const lines = [
    "id: " + S(id), "kind: " + S("scene"), "type: " + S("prompt"),
    "name_zh: " + S(zh), "name_en: " + S(en),
    "summary_zh: " + S(sumZh), "description: " + S(descEn),
    "keywords: " + FLOW(["scene", "prompt", fn]),
    "platforms: " + FLOW(platforms), "function: " + S(fn), "placements: " + FLOW(["full-screen"]),
    "granularity: " + S("flow"),
    "status: " + S("stale"),
    ...licenseLines(SELF_LICENSE),
    "level: " + S("scene"),
    "version: " + S("1.0.0"),
    "targets: " + FLOW(["html-css", "tailwind", "react"]),
    "refs: " + FLOW(refs.map(([prompt, overrides]) => ({ prompt, version: "1.0.0", overrides }))),
    "entries: " + FLOW(entryIds),
    "layout_zh: " + S(layout),
    ...verificationLines(),
    "created: " + S("2026-11-10"), "updated: " + S("2026-11-10"),
  ];
  const body = [
    "## 场景说明", "", sumZh, "",
    "## 版式说明", "", layout, "",
    "## 引用的组件提示词", "",
    ...refs.map(([p, o]) => "- `" + p + "` v1.0.0" + (Object.keys(o).length ? "，覆盖参数：" + Object.entries(o).map(([k, v]) => k + " = " + v).join("；") : "")), "",
    "## 生成顺序", "",
    "先按版式生成页面骨架，再逐个引用上面的组件提示词生成各部件，最后统一令牌与间距。不要把组件提示词全文复制进本场景——引用 + 覆盖即可（规格 §5.1）。", "",
    "（验证状态：待复验。本场景尚未经真实模型实测，验证字段如实留空。）",
  ].join("\n");
  writeFileSync("content/scenes/" + id + ".md", fmFile(lines, body));
}

console.log("entries:", ENTRIES.length, "prompts:", ENTRIES.length, "scenes:", SCENES.length);
