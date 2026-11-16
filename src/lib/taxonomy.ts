// 分类法维度标签（规格 §4）。维度值含义冻结，只增不改义。
export type Lang = "zh" | "en";
export const L2 = (lang: Lang, pair: { zh: string; en: string }) => (lang === "en" ? pair.en : pair.zh);

export const PLATFORMS: Record<string, { zh: string; en: string }> = {
  web: { zh: "Web 网站", en: "Web" },
  "web-mobile": { zh: "移动 Web / 小程序", en: "Mobile Web" },
  ios: { zh: "iOS", en: "iOS" },
  android: { zh: "Android 安卓", en: "Android" },
  harmonyos: { zh: "HarmonyOS 鸿蒙", en: "HarmonyOS" },
  desktop: { zh: "桌面客户端", en: "Desktop" },
  tablet: { zh: "平板", en: "Tablet" },
  all: { zh: "全平台通用", en: "All platforms" },
};

export const FUNCTIONS: Record<string, { zh: string; en: string }> = {
  navigation: { zh: "导航", en: "Navigation" },
  onboarding: { zh: "引导与入门", en: "Onboarding" },
  account: { zh: "身份与账号", en: "Account" },
  content: { zh: "内容组织", en: "Content" },
  search: { zh: "搜索与筛选", en: "Search" },
  form: { zh: "表单与输入", en: "Forms" },
  commerce: { zh: "交易", en: "Commerce" },
  personal: { zh: "个人空间", en: "Personal" },
  data: { zh: "数据与工作", en: "Data & Work" },
  marketing: { zh: "营销与内容", en: "Marketing" },
  feedback: { zh: "状态与反馈", en: "Feedback" },
  overlay: { zh: "浮层", en: "Overlays" },
  media: { zh: "媒体", en: "Media" },
  motion: { zh: "动效与背景", en: "Motion & Backgrounds" },
  theming: { zh: "主题与令牌", en: "Theming & Tokens" },
  assets: { zh: "基础资产", en: "Assets" },
};

export const PLACEMENTS: Record<string, { zh: string; en: string }> = {
  "status-area": { zh: "顶部状态区", en: "Status area" },
  "top-nav": { zh: "顶部导航", en: "Top navigation" },
  "bottom-tab": { zh: "底部标签栏", en: "Bottom tab bar" },
  "bottom-sheet": { zh: "底部弹层", en: "Bottom sheet" },
  "sidebar-left": { zh: "左侧栏 / 抽屉", en: "Left sidebar / drawer" },
  "sidebar-right": { zh: "右侧栏", en: "Right sidebar" },
  "content-area": { zh: "内容区", en: "Content area" },
  floating: { zh: "悬浮元素", en: "Floating" },
  overlay: { zh: "浮层", en: "Overlay" },
  "full-screen": { zh: "全屏", en: "Full screen" },
  inline: { zh: "行内", en: "Inline" },
  na: { zh: "不适用（资产/令牌）", en: "N/A (assets/tokens)" },
};

export const GRANULARITY: Record<string, { zh: string; en: string }> = {
  flow: { zh: "整套流程", en: "Flow" },
  page: { zh: "整页模板", en: "Page" },
  block: { zh: "区块", en: "Block" },
  component: { zh: "组件", en: "Component" },
  effect: { zh: "效果", en: "Effect" },
  token: { zh: "设计令牌", en: "Token" },
};
// 索引默认排序：整套的先给，再下沉到零件（规格 §4.4）
export const GRANULARITY_ORDER = ["flow", "page", "block", "component", "effect", "token"];
export const granRank = (g?: string) => {
  const i = GRANULARITY_ORDER.indexOf(g || "");
  return i === -1 ? 99 : i;
};

export const TYPES: Record<string, { zh: string; en: string }> = {
  component: { zh: "组件", en: "Component" },
  template: { zh: "模板", en: "Template" },
  effect: { zh: "效果", en: "Effect" },
  prompt: { zh: "提示词", en: "Prompt" },
  asset: { zh: "资产", en: "Asset" },
  "token-set": { zh: "令牌集", en: "Token set" },
  guide: { zh: "指南", en: "Guide" },
  resource: { zh: "外部资源", en: "Resource" },
};

export const DISCIPLINES: Record<string, { zh: string; en: string }> = {
  ui: { zh: "UI / UX 设计", en: "UI / UX Design" },
  interaction: { zh: "交互设计", en: "Interaction Design" },
  motion: { zh: "动效设计", en: "Motion Design" },
  visual: { zh: "视觉设计", en: "Visual Design" },
};

export const PRINCIPLE_GROUPS: Record<string, { zh: string; en: string }> = {
  nielsen: { zh: "尼尔森十大可用性原则", en: "Nielsen's 10 Usability Heuristics" },
  "laws-of-ux": { zh: "UX 心理定律", en: "Laws of UX" },
  gestalt: { zh: "格式塔原则", en: "Gestalt Principles" },
};
