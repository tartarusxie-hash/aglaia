// 生成 content/patterns/*.md（32 个模式，源：资源总目录 §1 分类术语表）
import { writeFileSync, mkdirSync } from "node:fs";
import { S, FLOW, licenseLines, fmFile, SELF_LICENSE } from "./yaml.mjs";

// [id, zh, en, function_group, platforms, definition_zh, definition_en, misconception_zh]
const P = [
  ["bottom-tab-bar", "底部标签栏", "Bottom Tab Bar", "navigation", ["ios", "android", "harmonyos", "web-mobile"], "App 底部固定的一排图标+文字，3–5 个一级入口，拇指一伸就够得到，是移动 App 最常用的主导航。", "A fixed bar at the bottom of an app with 3–5 top-level destinations, reachable by thumb — the most common primary navigation on mobile.", "塞 6 个以上入口，或把「发布/购物车」这类动作按钮也当标签放进来——标签是目的地，不是动作。"],
  ["top-navigation", "顶部导航", "Top Navigation / App Bar", "navigation", ["all"], "页面顶部的一条横栏：左边返回或菜单，中间标题，右边放当前页最常用的操作。", "The bar at the top of a page: back or menu on the left, title in the middle, the page's most common actions on the right.", "把全站导航、面包屑、搜索、用户菜单全塞进顶栏——顶栏只服务当前页，全站导航另有其位。"],
  ["drawer-sidebar", "侧边抽屉", "Drawer / Sidebar", "navigation", ["all"], "从屏幕侧边滑出的导航面板：移动端藏在汉堡菜单后，桌面端常驻为左侧栏。", "A navigation panel that slides in from the side: hidden behind a hamburger on mobile, pinned as a sidebar on desktop.", "一级入口也藏进抽屉——用户看不见就等于没有；抽屉只放二级及以下导航。"],
  ["breadcrumb", "面包屑", "Breadcrumb", "navigation", ["web", "desktop"], "一行「首页 / 分类 / 当前页」的小字，告诉用户自己在网站层级里的哪一层，并能一键跳回上层。", "A trail like Home / Category / Current page that shows where you are in the site hierarchy and lets you jump back up.", "只有两层还硬上面包屑，或者面包屑和浏览器后退键打架——层级 ≤2 时它只是噪音。"],
  ["tabs-segmented", "标签页与分段控制", "Tabs / Segmented Control", "navigation", ["all"], "同一屏里切换内容分组的控件：标签页偏「换一组内容」，分段控制偏「换一种视图」，外形像药丸或下划线。", "Controls that switch content groups within one screen: tabs swap content sets, segmented controls swap views — pill-shaped or underlined.", "用标签页装没有关系的页面（那该用导航），或者分段里放 5 个以上选项（该用下拉或标签页）。"],
  ["onboarding", "新手引导", "Onboarding / Walkthrough", "onboarding", ["ios", "android", "harmonyos", "web-mobile"], "新用户第一次打开时看到的几屏介绍或分步设置：讲清价值、拿到必要信息、送用户到第一个「啊哈」时刻。", "The first-run screens or step-by-step setup a new user sees: explain the value, collect what's needed, and get them to the first aha moment.", "把产品说明书做成 7 屏轮播——用户只想快点开始；引导要短、能跳过、最好边做边学。"],
  ["auth", "登录与注册", "Auth / Login & Sign Up", "account", ["all"], "账号入口这一整套：登录、注册、验证码、第三方登录、忘记密码、协议确认。", "The full account entry set: sign in, sign up, verification codes, social login, password reset, and terms consent.", "注册时一次问全所有资料——先让用户进来，资料在用到时再补，转化率差好几倍。"],
  ["list", "列表", "List", "content", ["all"], "内容最基础的组织方式：一行一条，可单行可多行，可分组，可带左滑操作和右侧配件。", "The most basic way to organize content: one row per item — single or multi-line, grouped, with swipe actions and accessories.", "什么都用列表——图片为主的内容该用宫格，强对比的内容该用卡片，列表会把它们压扁。"],
  ["card", "卡片", "Card", "content", ["all"], "一块内容一个卡：图、标题、摘要、操作圈在一张「卡片」里，是商品、文章、用户信息最常用的容器。", "One chunk of content per card — image, title, summary, actions in one container; the default vessel for products, articles, and people.", "卡片套卡片、卡片里再放卡片——层级超过两层就糊了；卡片是终点容器，不是俄罗斯套娃。"],
  ["grid-masonry", "宫格与瀑布流", "Grid & Masonry", "content", ["all"], "多列排布图片或卡片：宫格等高对齐，瀑布流按内容高度错落，适合逛和发现。", "Multi-column layouts for images or cards: grids align to equal heights, masonry staggers by content height — made for browsing and discovery.", "瀑布流里放需要按顺序读的内容——错落排布没有阅读顺序，重要信息会被跳过。"],
  ["detail-page", "详情页", "Detail Page", "content", ["all"], "单个对象的完整页面：商品详情、文章详情、个人主页——大图/标题开头，信息全面展开，底部放行动按钮。", "The full page for a single object — product, article, profile: hero media and title first, complete information, action buttons at the end.", "详情页做成第二个首页——它只服务「看清这一个 + 做决定」，别把推荐流无限堆下去。"],
  ["search", "搜索", "Search", "search", ["all"], "让用户主动找东西的一套：搜索框、联想词、历史记录、结果页、筛选与排序。", "The set that lets users actively find things: search box, suggestions, history, results page, filters, and sorting.", "只给一个空框——没有联想、没有历史、没有热门词，等于让用户对着白墙说话。"],
  ["forms", "表单", "Forms", "form", ["all"], "让用户输入和选择的一整套控件：输入框、选择器、开关、单选多选、滑杆、日期、评分、步进器。", "The full set of input controls: text fields, pickers, switches, radios, checkboxes, sliders, dates, ratings, steppers.", "一屏堆二十个字段还全是必填——按任务分组、只问必要的、能默认就默认。"],
  ["checkout", "支付与结算", "Checkout & Payment", "commerce", ["all"], "从购物车到付款成功的一段路：清单确认、地址、优惠、支付方式、订单结果。", "The path from cart to paid: item review, address, discounts, payment method, and the order result.", "结算中途弹营销弹窗、加购推荐——临门一脚只谈钱和确认，其他都等付完再说。"],
  ["settings", "设置", "Settings", "personal", ["all"], "账号、通知、隐私、外观、关于——所有「不常用但必须有」的开关和选项的归宿。", "The home for infrequent but essential options: account, notifications, privacy, appearance, about.", "把常用功能也埋进设置——设置是收纳盒不是黑洞，高频功能要有正门。"],
  ["profile", "个人中心", "Profile", "personal", ["all"], "「我的」页面：头像与资料打头，下面是订单、收藏、成就等属于用户自己的入口集合。", "The 'Me' page: avatar and profile up top, then the user's own entries — orders, favorites, achievements.", "个人中心做成第二个首页塞满运营位——用户来这是来找自己的东西的。"],
  ["messages", "消息与通知", "Messages & Notifications", "personal", ["all"], "聊天与系统消息的归宿：会话列表、通知列表、消息中心，带未读角标和已读状态。", "Where chats and system messages live: conversation lists, notification lists, message centers, with unread badges and read states.", "所有推送都进消息中心堆着——分清「要处理的」和「知道就行」，前者才配红点。"],
  ["dashboard", "仪表盘", "Dashboard", "data", ["web", "desktop"], "数据工作的首页：关键指标卡片打头，图表和数据表跟上，一眼看清现在怎么样。", "The home of data work: key metric cards first, charts and tables after — the state of things at a glance.", "把所有图表都堆上首屏——仪表盘要回答问题，不是展示库存；先定问题再选图。"],
  ["data-display", "数据展示", "Data Display", "data", ["web", "desktop"], "把数据给人看的组件族：表格、统计数字、时间线、徽章、标签、树形结构。", "The component family for presenting data: tables, statistics, timelines, badges, tags, trees.", "表格里塞操作按钮阵列——一行超过 2 个行内操作就该收进「更多」菜单。"],
  ["marketing-landing", "营销页", "Marketing / Landing", "marketing", ["web"], "说服访客行动的单页：Hero 讲清价值，特性、社会证明、定价、FAQ 层层推进，最后落到 CTA。", "A page that persuades visitors to act: a hero that states the value, then features, social proof, pricing, FAQ — all leading to the CTA.", "Hero 里放三段公司介绍——访客只关心「这对我有什么用」，3 秒说不清就走了。"],
  ["blog-content", "博客与内容", "Blog & Content", "marketing", ["web"], "文章型内容的组织：文章列表、文章页、标签、作者、订阅入口。", "How article content is organized: post lists, article pages, tags, authors, subscribe entries.", "文章页塞满弹窗和侧栏推广——阅读体验是内容站的命，推广让位给正文。"],
  ["ecommerce", "电商", "E-commerce", "commerce", ["all"], "卖货的一套组合：店铺首页、商品列表、商品卡、购物车、结算，与「交易」功能组紧密相连。", "The selling set: shop home, product lists, product cards, cart, checkout — tightly bound to the commerce function group.", "商品卡只放图不放价——价格是电商卡片的第一信息，和图同等重要。"],
  ["empty-states", "空状态", "Empty States", "feedback", ["all"], "没有东西时给人看的那一屏：无数据、无网络、无搜索结果、无权限——都要有说法、有下一步。", "What people see when there's nothing: no data, no network, no results, no permission — each needs an explanation and a next step.", "空状态只写「暂无数据」四个字——说清为什么空、用户能做什么，才是合格的空状态。"],
  ["loading-feedback", "加载与反馈", "Loading & Feedback", "feedback", ["all"], "系统状态的传话筒：加载动画、骨架屏、进度条、Toast、成功/失败提示、徽章。", "The messengers of system state: loaders, skeletons, progress bars, toasts, success/failure notices, badges.", "转圈超过 1 秒还不给骨架或进度——等待可以，装作没在加载不行。"],
  ["modals-overlays", "弹窗与浮层", "Modals & Overlays", "overlay", ["all"], "浮在当前页面之上的层：对话框、底部弹层、抽屉、气泡菜单——打断或补充当前任务。", "Layers that float above the page: dialogs, bottom sheets, drawers, popover menus — interrupting or supplementing the current task.", "弹层里再弹层、关闭按钮找不到——浮层最多套一层，关闭永远在右上或明确按钮。"],
  ["errors", "错误页", "Errors", "feedback", ["all"], "出错时给人看的页面：404、网络错误、权限不足、表单报错——说清发生了什么和能做什么。", "Pages for when things go wrong: 404, network errors, permission denied, form errors — what happened and what to do.", "错误页只写代码不写人话（Error 500）——用户需要的是原因和出路，不是编号。"],
  ["media", "媒体", "Media", "media", ["all"], "图片与音视频的呈现：轮播、画廊、视频播放器、音频条、封面图。", "How images and audio/video are presented: carousels, galleries, video players, audio bars, cover art.", "轮播自动播放还停不下来——自动轮播必须可暂停，且别超过 5 张。"],
  ["effects-backgrounds", "动效与背景", "Effects & Backgrounds", "motion", ["web", "web-mobile"], "让界面动起来、衬起来的那一层：玻璃拟态、渐变、粒子、转场——本站「效果」板块的主场。", "The layer that makes interfaces move and glow: glassmorphism, gradients, particles, transitions — home turf of this site's Effects section.", "动效当主角——动效是仆人不是主人，抢过内容的风头就是灾难。"],
  ["theme-tokens", "主题与令牌", "Theme & Tokens", "theming", ["all"], "全站长相的源头：颜色、字阶、间距、圆角、深色模式——都收敛成一组可复用的令牌。", "The source of a site's whole look: colors, type scale, spacing, radii, dark mode — converged into reusable tokens.", "每个页面各写各的颜色值——改一次全站要改一百处；令牌就是为了只改一处。"],
  ["typography", "排版", "Typography", "theming", ["all"], "文字的秩序：标题层级、正文字号行高、数字、引用、代码——读得舒服全靠它。", "The order of text: heading levels, body size and line height, numbers, quotes, code — readability lives here.", "正文小于 14px、行高小于 1.4——排版没有捷径，挤在一起的字没人读。"],
  ["icons", "图标", "Icons", "assets", ["all"], "小而关键的图形语言：系统图标、品牌图标、状态图标，一套图标必须风格统一。", "The small but crucial graphic language: system icons, brand icons, status icons — one set, one consistent style.", "一个界面混用三套图标库——线宽、圆角、风格全打架，用户说不出哪不对但就是觉得糙。"],
  ["illustrations", "插画", "Illustrations", "assets", ["all"], "场景插画、人物、占位图：给空状态、引导页、营销页补上人味和画面感。", "Scene illustrations, characters, placeholders: the human touch for empty states, onboarding, and marketing pages.", "插画风格每页一个样——定一套插画系统（人物比例、配色、线条）再批量画。"],
];

mkdirSync("content/patterns", { recursive: true });
for (const [id, zh, en, group, platforms, defZh, defEn, misc] of P) {
  const lines = [
    "id: " + S(id), "kind: " + S("pattern"), "type: " + S("guide"),
    "name_zh: " + S(zh), "name_en: " + S(en),
    "summary_zh: " + S(defZh), "description: " + S(defEn),
    "keywords: " + FLOW([en.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(), "pattern", group]),
    "status: " + S("published"),
    ...licenseLines(SELF_LICENSE),
    "function_group: " + S(group),
    "definition_zh: " + S(defZh), "definition_en: " + S(defEn),
    "misconceptions_zh: " + S(misc),
    "platforms: " + FLOW(platforms),
    "function: " + S(group),
    "placements: " + FLOW(["na"]),
    "granularity: " + S("block"),
    "created: " + S("2026-11-10"), "updated: " + S("2026-11-10"),
  ];
  const body = [
    "## 这是什么", "", defZh, "",
    "## 常见误区", "", misc, "",
    "## 在本站怎么用", "",
    "本模式下的组件条目都挂在下方「本站条目」里，每个条目带一条可直接复制给 AI 的提示词；想先看效果，去「效果」板块；想查开源实现，去「资源」板块按本模式关联筛选。",
  ].join("\n");
  writeFileSync("content/patterns/" + id + ".md", fmFile(lines, body));
}
console.log("patterns written:", P.length);
