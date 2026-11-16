// 生成 content/resources/*.md（批次 2：资源总目录 §0.1 优先种子包）
// 全部为外链引用 + 许可标注，不打包、不复制第三方代码。license.verified 一律 false：
// 本批次未逐字复核各仓库 LICENSE 原文（spdx 取自项目公开标注），正文逐条注明。
import { writeFileSync, mkdirSync } from "node:fs";
import { S, FLOW, fmFile } from "./yaml.mjs";

// [id, name_zh, name_en, usage, type, function, spdx, author, url, fee_zh, summary_zh, description_en, patterns]
const R = [
  // —— 组件库（17）——
  ["shadcn-ui", "shadcn/ui 组件库", "shadcn/ui", "library", "resource", "assets", "MIT", "shadcn", "https://ui.shadcn.com", "免费（MIT）", "不是装进项目的库，而是把组件源码复制进你自己的仓库——改起来毫无阻力，AI 也最熟它。", "Copy-paste component source built on Radix and Tailwind — you own the code, and AI tools know it best.", ["forms", "modals-overlays", "top-navigation"]],
  ["tdesign", "TDesign（腾讯）", "TDesign", "library", "resource", "assets", "MIT", "Tencent", "https://tdesign.tencent.com", "免费（MIT）", "腾讯出品的全栈设计系统：Web、移动、小程序、桌面都有，国内生态最完整的一套。", "Tencent's full-stack design system covering web, mobile, mini-programs, and desktop.", ["bottom-tab-bar", "forms", "dashboard"]],
  ["tamagui", "Tamagui", "Tamagui", "library", "resource", "assets", "MIT", "Tamagui", "https://tamagui.dev", "免费（MIT）", "一套代码同时跑 Web 和 React Native，样式在编译期优化，跨端项目的种子主力。", "One codebase for web and React Native with compile-time style optimization.", ["card", "list"]],
  ["nativewind", "NativeWind", "NativeWind", "library", "resource", "theming", "MIT", "NativeWind", "https://www.nativewind.dev", "免费（MIT）", "让 React Native 用上 Tailwind 的写法：类名写样式，原生端终于和 Web 端一个心智。", "Tailwind-style utility classes for React Native.", ["theme-tokens"]],
  ["gluestack-ui", "gluestack-ui", "gluestack-ui", "library", "resource", "assets", "MIT", "gluestack", "https://gluestack.io", "免费（MIT）", "可复制源码的跨端组件库（React Native / Web），思路与 shadcn 相近。", "Copy-paste cross-platform components for React Native and web, shadcn-style.", ["card", "forms"]],
  ["arkui", "ArkUI（鸿蒙）", "ArkUI", "library", "resource", "assets", "Apache-2.0", "OpenHarmony", "https://github.com/openharmony/arkui_ace_engine", "免费（Apache-2.0）", "HarmonyOS 的官方 UI 框架底座（开源部分）：做鸿蒙界面先看它，声明式写法与 ArkTS 配套。", "The open-source UI framework base of HarmonyOS, paired with ArkTS declarative syntax.", ["bottom-tab-bar", "list"]],
  ["swiftuix", "SwiftUIX", "SwiftUIX", "library", "resource", "assets", "MIT", "SwiftUIX", "https://github.com/SwiftUIX/SwiftUIX", "免费（MIT）", "给 SwiftUI 补齐缺失的系统级组件，iOS 原生开发的常用扩展库。", "Fills the gaps in SwiftUI with system-level components Apple didn't ship.", ["list", "forms"]],
  ["forui", "Forui（Flutter）", "Forui", "library", "resource", "assets", "MIT", "Forui", "https://forui.dev", "免费（MIT）", "给 Flutter 用的极简风组件库，气质接近 shadcn，桌面与移动通吃。", "Minimalist Flutter components in the spirit of shadcn, for desktop and mobile.", ["card", "forms"]],
  ["flutter-shadcn-ui", "flutter-shadcn-ui", "flutter-shadcn-ui", "library", "resource", "assets", "MIT", "flutter-shadcn-ui", "https://github.com/nank1ro/flutter-shadcn-ui", "免费（MIT）", "把 shadcn/ui 的组件语言搬进 Flutter：同一套设计，两端落地。", "shadcn/ui's component language ported to Flutter.", ["card", "dashboard"]],
  ["getwidget", "GetWidget（Flutter）", "GetWidget", "library", "resource", "assets", "MIT", "GetWidget", "https://getwidget.dev", "免费（官网标注 MIT，未复核）", "Flutter 老牌组件库，组件数量多、文档全，列表与卡片是强项。", "A long-running Flutter component library with broad coverage and full docs.", ["list", "card", "media"]],
  ["carbon", "Carbon（IBM）", "Carbon Design System", "library", "resource", "theming", "Apache-2.0", "IBM", "https://carbondesignsystem.com", "免费（Apache-2.0）", "IBM 的设计系统：Token 体系与数据密集型界面的标杆，后台产品必读参考。", "IBM's design system — a benchmark for token systems and data-dense interfaces.", ["dashboard", "data-display", "theme-tokens"]],
  ["primer", "Primer（GitHub）", "Primer", "library", "resource", "theming", "MIT", "GitHub", "https://primer.style", "免费（MIT）", "GitHub 自家设计系统：克制、工程化，面包屑与数据展示值得抄作业。", "GitHub's own design system — restrained and engineering-minded.", ["breadcrumb", "data-display"]],
  ["mui", "MUI（Material UI）", "MUI", "library", "resource", "assets", "MIT", "MUI", "https://mui.com", "免费（MIT，核心）", "React 生态最老牌的 Material 组件库：组件全、文档厚、AI 生成命中率最高之一。", "The most established Material component library for React.", ["forms", "data-display", "top-navigation"]],
  ["ant-design", "Ant Design（蚂蚁）", "Ant Design", "library", "resource", "assets", "MIT", "Ant Group", "https://ant.design", "免费（MIT）", "国内中后台的事实标准：表格、表单、列表都是行业参照物。", "The de-facto standard for admin interfaces in China — tables, forms, lists.", ["data-display", "forms", "list", "settings"]],
  ["chakra-ui", "Chakra UI", "Chakra UI", "library", "resource", "assets", "MIT", "Chakra UI", "https://chakra-ui.com", "免费（MIT）", "以可访问性为底线的 React 组件库：样式用 props 写，上手快。", "An accessibility-first React component library with prop-based styling.", ["forms", "modals-overlays"]],
  ["mantine", "Mantine", "Mantine", "library", "resource", "assets", "MIT", "Mantine", "https://mantine.dev", "免费（MIT）", "React 组件与 hooks 大礼包：100+ 组件，连日期选择这种难啃的都有。", "A batteries-included React library: 100+ components and hooks, even date pickers.", ["forms", "card"]],
  ["radix-ui", "Radix UI（无样式原语）", "Radix UI", "library", "resource", "overlay", "MIT", "WorkOS", "https://www.radix-ui.com", "免费（MIT）", "只管行为不管长相的组件原语：弹层、菜单、开关的键盘与焦点处理都替你做好了。", "Unstyled primitives that get behavior right: keyboard, focus, and ARIA for overlays and controls.", ["modals-overlays", "forms"]],
  // —— 模板（8）——
  ["penpot-files", "Penpot 官方模板文件库", "Penpot Libraries & Templates", "template", "template", "assets", "CC-BY-4.0", "Penpot", "https://penpot.app/libraries-templates", "免费（CC BY 4.0）", "少有的原生设计文件批量来源：能直接下 .penpot 文件拆解学习，模板入库的种子。", "A rare source of native design files — downloadable .penpot templates to study and reuse.", ["marketing-landing", "dashboard"]],
  ["shadcn-admin", "shadcn-admin 后台模板", "shadcn-admin", "template", "template", "data", "MIT", "satnaing", "https://github.com/satnaing/shadcn-admin", "免费（MIT）", "shadcn/ui 拼出的完整后台：仪表盘、设置、聊天页都有，拆开就是现成的页面范式。", "A complete admin dashboard built with shadcn/ui — dashboard, settings, chat pages included.", ["dashboard", "settings", "messages"]],
  ["tabler", "Tabler 后台模板", "Tabler", "template", "template", "data", "MIT", "Tabler", "https://tabler.io", "免费（MIT）", "老牌免费后台模板：页面量级大、完成度高，后台项目可以直接站在它肩膀上。", "A long-running free admin template with many polished pages.", ["dashboard", "data-display"]],
  ["adminlte", "AdminLTE 后台模板", "AdminLTE", "template", "template", "data", "MIT", "AdminLTE", "https://adminlte.io", "免费（MIT）", "Bootstrap 系后台模板的常青树：稳重、齐全，企业内部系统常用。", "The evergreen Bootstrap admin template — complete and dependable.", ["dashboard", "drawer-sidebar"]],
  ["astrowind", "AstroWind 落地页模板", "AstroWind", "template", "template", "marketing", "MIT", "onWidget", "https://github.com/onwidget/astrowind", "免费（MIT）", "Astro + Tailwind 的落地页与博客范式：Hero、特性、定价、FAQ 一应俱全。", "An Astro + Tailwind landing page and blog template with all the standard sections.", ["marketing-landing", "blog-content"]],
  ["astro-paper", "Astro Paper 博客模板", "Astro Paper", "template", "template", "marketing", "MIT", "satnaing", "https://github.com/satnaing/astro-paper", "免费（MIT）", "极简博客模板的范本：排版干净、性能满分，写博客直接开用。", "A minimal, typography-first blog template with top performance scores.", ["blog-content", "typography"]],
  ["obytes-rn-template", "React Native 模板（Obytes）", "React Native Template Obytes", "template", "template", "assets", "MIT", "Obytes", "https://github.com/obytes/react-native-template-obytes", "免费（MIT）", "Expo 移动 App 的生产级脚手架：导航、状态、表单、测试都预置好，移动模板的分层标杆。", "A production-grade Expo starter: navigation, state, forms, and tests preconfigured.", ["auth", "bottom-tab-bar"]],
  ["shadcn-landing-page", "shadcn 落地页模板", "shadcn Landing Page", "template", "template", "marketing", "MIT", "leoMirandaa", "https://github.com/leoMirandaa/shadcn-landing-page", "免费（MIT）", "shadcn/ui 拼的标准落地页：区块拆分清楚，照着区块清单就能拼自己的营销页。", "A standard landing page assembled from shadcn/ui, cleanly split into sections.", ["marketing-landing"]],
  // —— 效果与动效（9）——
  ["magic-ui", "Magic UI 动效组件", "Magic UI", "library", "resource", "motion", "MIT", "Magic UI", "https://magicui.design", "免费（MIT）", "React + Tailwind 的动效组件集：跑马灯、光晕、数字滚动都有，本站效果库的重要参考生态。", "Animated components for React + Tailwind — marquees, glows, counters; a key reference ecosystem for this site's effects.", ["effects-backgrounds", "loading-feedback"]],
  ["uiverse", "Uiverse 社区效果库", "Uiverse", "library", "resource", "motion", "MIT", "Uiverse", "https://uiverse.io", "免费（MIT，逐条以页面标注为准）", "社区共创的 CSS 效果大集市：按钮、加载、卡片效果数千个，找灵感和看实现都方便。", "A community marketplace of thousands of CSS effects — buttons, loaders, cards.", ["effects-backgrounds", "loading-feedback"]],
  ["motion", "Motion 动画引擎", "Motion", "library", "resource", "motion", "MIT", "Motion", "https://motion.dev", "免费（MIT）", "现代 Web 动画引擎（Framer Motion 的延续）：声明式动画、滚动驱动、手势都拿手。本站动效只用这类 MIT 引擎，不用 GSAP。", "The modern web animation engine (successor to Framer Motion). This site uses MIT engines like this — never GSAP.", ["effects-backgrounds"]],
  ["lottiefiles", "LottieFiles 免费动画库", "LottieFiles Free Library", "library", "resource", "motion", "NOASSERTION", "LottieFiles", "https://lottiefiles.com", "免费库可用（Lottie 简单许可）", "最大的 Lottie 动画集市：免费库可商用，下载 JSON 就能在 App 和网页里播。", "The largest Lottie animation library; the free tier is usable commercially as JSON animations.", ["loading-feedback", "empty-states"]],
  ["dotlottie", "dotLottie 运行时", "dotLottie", "library", "resource", "motion", "MIT", "LottieFiles", "https://github.com/LottieFiles/dotlottie-web", "免费（MIT）", "Lottie 的现代运行时：一个 .lottie 文件打包动画与资源，各端播放一致。", "The modern Lottie runtime — one .lottie file bundles animation and assets for every platform.", ["loading-feedback"]],
  ["animista", "Animista 动画预设", "Animista", "tool", "resource", "motion", "NOASSERTION", "Animista", "https://animista.net", "免费使用（站内许可）", "CSS 动画预设原型站：点选预设、调参数、复制代码，入场/强调动画的灵感库。", "A CSS animation preset playground — pick, tune, copy the code.", ["effects-backgrounds"]],
  ["paper-shaders", "Paper Shaders 着色器", "Paper Shaders", "library", "resource", "motion", "Apache-2.0", "Paper", "https://github.com/paper-design/shaders", "免费（Apache-2.0）", "现成的 WebGL 着色器背景：网格渐变、波纹、光晕，不写 GLSL 也能用高级背景。", "Ready-made WebGL shader backgrounds — mesh gradients, waves, glows without writing GLSL.", ["effects-backgrounds"]],
  ["tsparticles", "tsParticles 粒子引擎", "tsParticles", "library", "resource", "motion", "MIT", "tsParticles", "https://particles.js.org", "免费（MIT）", "老牌粒子背景引擎：星空、雪花、连线网络，配置即生成，性能可控。", "The classic particle background engine — stars, snow, networks, all config-driven.", ["effects-backgrounds"]],
  ["css-loaders", "CSS Loaders 加载动画集", "CSS Loaders", "tool", "resource", "feedback", "MIT", "CSS Loaders", "https://cssloaders.github.io", "免费（MIT）", "纯 CSS 加载动画合集：600+ 个 spinner 与 loader，复制一段 CSS 就能用。", "600+ pure-CSS loading spinners and loaders — copy one snippet and go.", ["loading-feedback"]],
  // —— 提示词参考（3）——
  ["bolt-diy", "bolt.diy（开源 AI 建站）", "bolt.diy", "reference", "resource", "assets", "MIT", "StackBlitz Labs", "https://github.com/stackblitz-labs/bolt.diy", "免费（MIT）", "开源 AI 建站工具：它的系统提示词（prompts.ts）是学「怎么让 AI 写界面」的最佳范本。", "An open-source AI site builder — its system prompt (prompts.ts) is a masterclass in directing AI to build UIs.", []],
  ["open-lovable", "Open Lovable", "Open Lovable", "reference", "resource", "assets", "MIT", "Firecrawl", "https://github.com/firecrawl/open-lovable", "免费（MIT）", "开源版 AI 建站流程：从一句话到可预览网站的全链路，学流程拆解看它。", "An open-source AI website builder — the full prompt-to-preview pipeline, open to study.", []],
  ["langgpt", "LangGPT 提示词结构", "LangGPT", "reference", "resource", "assets", "Apache-2.0", "LangGPT", "https://github.com/yzfly/LangGPT", "免费（目录标注 Apache-2.0，未复核）", "像写代码一样写提示词的结构框架：角色、规则、工作流分节——本站七段式与它同源同理。", "A framework for writing prompts like code — roles, rules, workflows in sections.", []],
  // —— 图标 / 插画 / 字体（11）——
  ["lucide", "Lucide 图标", "Lucide Icons", "library", "asset", "assets", "ISC", "Lucide", "https://lucide.dev", "免费（ISC）", "最干净的一套线性图标：线宽统一、风格克制，Web 与 App 都能用，本站图标首选参照。", "The cleanest line icon set — consistent strokes, restrained style, for web and apps.", ["icons"]],
  ["tabler-icons", "Tabler Icons 图标", "Tabler Icons", "library", "asset", "assets", "MIT", "Tabler", "https://tabler.io/icons", "免费（MIT）", "4000+ 线性图标，数量与质量兼备，后台产品用它基本不用再找第二套。", "4,000+ line icons — quantity and quality together.", ["icons"]],
  ["simple-icons", "Simple Icons 品牌图标", "Simple Icons", "library", "asset", "assets", "CC0-1.0", "Simple Icons", "https://simpleicons.org", "免费（CC0）", "各大品牌 logo 的单色 SVG 合集：放「支持的平台/合作方」时用它，别自己描品牌 logo。", "Monochrome SVG brand logos — use these instead of tracing brand marks yourself.", ["icons"]],
  ["iconify", "Iconify 图标检索底座", "Iconify", "tool", "asset", "assets", "MIT", "Iconify", "https://iconify.design", "免费（MIT 框架，各图标集许可独立）", "把上百套图标集统一成一个检索与调用接口：工作台找图标的中枢。", "One search and API over 100+ icon sets — the hub for finding icons.", ["icons"]],
  ["material-symbols", "Material Symbols 图标", "Material Symbols", "library", "asset", "assets", "Apache-2.0", "Google", "https://fonts.google.com/icons", "免费（Apache-2.0）", "Google 的可变图标字体：粗细、填充可调，Android 与 Material 体系项目的默认图标。", "Google's variable icon font — adjustable weight and fill; the default for Material projects.", ["icons"]],
  ["open-doodles", "Open Doodles 插画", "Open Doodles", "library", "asset", "assets", "CC0-1.0", "Pablo Stanley", "https://www.opendoodles.com", "免费（CC0）", "手绘风免费插画：涂鸦人物与场景，空状态和引导页的常用粮草。", "Hand-drawn free illustrations — doodle people and scenes for empty states and onboarding.", ["illustrations", "empty-states"]],
  ["open-peeps", "Open Peeps 人物插画", "Open Peeps", "library", "asset", "assets", "CC0-1.0", "Pablo Stanley", "https://www.openpeeps.com", "免费（CC0）", "可拼装的人物插画系统：脸、发型、姿势自由组合，人物一致性难题的现成解。", "A mix-and-match character illustration system — faces, hair, poses combine freely.", ["illustrations"]],
  ["undraw", "unDraw 插画（仅外链）", "unDraw", "reference", "asset", "assets", "NOASSERTION", "unDraw", "https://undraw.co", "免费使用（站内条款，不可再分发）", "最知名的开源风插画站：本站仅外链参考，不打包、不再分发其文件。", "The best-known open-style illustration site — linked for reference only, never bundled or redistributed here.", ["illustrations", "empty-states"]],
  ["inter-font", "Inter 字体", "Inter", "library", "asset", "theming", "OFL-1.1", "Rasmus Andersson", "https://rsms.me/inter/", "免费（OFL-1.1）", "为屏幕而生的西文字体：界面里的英文和数字用它基本不会错，本站正文字体。", "A typeface made for screens — the safe default for UI Latin text and numbers.", ["typography"]],
  ["source-han-sans", "思源黑体 Source Han Sans", "Source Han Sans", "library", "asset", "theming", "OFL-1.1", "Adobe & Google", "https://github.com/adobe-fonts/source-han-sans", "免费（OFL-1.1）", "中日韩统一黑体：中文界面字体的稳妥选择，字重齐全，开源可商用。", "The unified CJK sans — the dependable choice for Chinese UI text, full weight range, open license.", ["typography"]],
  ["jetbrains-mono", "JetBrains Mono 等宽字体", "JetBrains Mono", "library", "asset", "theming", "OFL-1.1", "JetBrains", "https://www.jetbrains.com/lp/mono/", "免费（OFL-1.1）", "代码与数字的等宽字体：本站代码字体，数字滚动时不跳宽靠它。", "A monospace font for code and numbers — this site's code font.", ["typography"]],
  // —— 设计规范（5）——
  ["material-design-3", "Material Design 3 规范", "Material Design 3", "spec", "resource", "theming", "Apache-2.0", "Google", "https://m3.material.io", "免费（代码 Apache-2.0）", "Google 的设计语言全文：Android 与跨端项目的规范源头，Token 体系的参照系。", "Google's design language in full — the spec source for Android and cross-platform work.", ["theme-tokens", "bottom-tab-bar"]],
  ["apple-hig", "Apple 人机界面指南 HIG（仅参考）", "Apple Human Interface Guidelines", "spec", "resource", "theming", "NOASSERTION", "Apple", "https://developer.apple.com/design/human-interface-guidelines", "免费查阅（仅参考）", "iOS 设计的官方规范：只读、只参考。本站绝不打包 Apple 官方套件与 SF Pro 字体。", "Apple's official iOS design guidelines — read and reference only. This site never bundles Apple kits or SF Pro.", ["bottom-tab-bar", "top-navigation"]],
  ["harmonyos-design", "HarmonyOS 设计指南（仅参考）", "HarmonyOS Design Guidelines", "spec", "resource", "theming", "NOASSERTION", "Huawei", "https://developer.huawei.com/consumer/cn/design/", "免费查阅（仅参考）", "鸿蒙官方设计指南：只读、只参考。官方资源在取得书面许可前不打包，本站鸿蒙条目为自绘示意 + 规范要点。", "Huawei's official HarmonyOS design guidelines — reference only. No official assets are bundled without written permission; this site's HarmonyOS entries are self-drawn schematics plus spec notes.", ["bottom-tab-bar", "list"]],
  ["wcag-22", "WCAG 2.2 无障碍规范", "WCAG 2.2", "spec", "resource", "theming", "NOASSERTION", "W3C", "https://www.w3.org/TR/WCAG22/", "免费查阅（W3C 文档许可）", "无障碍的国际标准原文：对比度、焦点、目标尺寸的数字都出自这里。", "The international accessibility standard — the source of contrast, focus, and target-size numbers.", ["theme-tokens", "forms"]],
  ["fluent-2", "Fluent 2（微软）", "Fluent 2", "spec", "resource", "theming", "MIT", "Microsoft", "https://fluent2.microsoft.design", "免费（MIT）", "微软的设计语言：桌面与办公场景的规范参照，Token 与主题做法值得学。", "Microsoft's design language — the reference for desktop and productivity scenarios.", ["theme-tokens", "dashboard"]],
  ["gestalt", "Gestalt（Pinterest）", "Gestalt", "spec", "resource", "theming", "Apache-2.0", "Pinterest", "https://gestalt.pinterest.com", "免费（Apache-2.0）", "Pinterest 的设计系统：瀑布流 Masonry 的出处，图片型产品的排布参照。", "Pinterest's design system — the home of the Masonry layout and image-first patterns.", ["grid-masonry", "card"]],
];

mkdirSync("content/resources", { recursive: true });
let skipped = 0;
for (const [id, zh, en, usage, type, fn, spdx, author, url, fee, sumZh, descEn, patterns] of R) {
  const lines = [
    "id: " + S(id), "kind: " + S("resource"), "type: " + S(type),
    "name_zh: " + S(zh), "name_en: " + S(en),
    "summary_zh: " + S(sumZh), "description: " + S(descEn),
    "keywords: " + FLOW([en.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(), usage, fn]),
    "platforms: " + FLOW(["all"]),
    "function: " + S(fn),
    "placements: " + FLOW(["na"]),
    "granularity: " + S(type === "asset" ? "token" : "block"),
    "url: " + S(url),
    "usage: " + S(usage),
    "reference_only: " + (usage === "reference" || usage === "spec" ? "true" : "false"),
    "fee_note_zh: " + S(fee),
    "patterns: " + FLOW(patterns),
    "status: " + S("published"),
    "license:",
    "  spdx: " + S(spdx),
    "  author: " + S(author),
    "  source_url: " + S(url),
    "  verified: false",
    "created: " + S("2026-11-10"), "updated: " + S("2026-11-10"),
  ];
  const body = [
    sumZh, "",
    "- 来源：" + author + "（" + fee + "）",
    "- 链接：" + url,
    "- 许可说明：外部资源，权利归其权利方；本站仅外链引用、**不打包、不再分发**其内容。许可标识取自项目公开标注（资源总目录 2026-10-28 调研），本批次未逐字复核 LICENSE 原文，正式商用前请打开仓库 LICENSE 再确认。",
  ].join("\n");
  writeFileSync("content/resources/" + id + ".md", fmFile(lines, body));
}
console.log("resources written:", R.length, "skipped:", skipped);
