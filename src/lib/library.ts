// 资源库八分区（泡泡轨道的选项，顺序即轨道顺序；艺术风格居首）。
// styles 暂只做中文页（39 篇条目全文翻译在修订轮），故 zhOnly：轨道与枢纽在中英双语下都链到 /styles/，不走 /en/styles/。
// skills（2026-11-15 用户定进资源库）：免费技能库，Aglaia 自家 skill + 19 条第三方开源设计 skills。
// fonts（2026-11-15 第八分区）：字体库，中英双语。
export type LibrarySection = "styles" | "components" | "effects" | "prompts" | "resources" | "learn" | "skills" | "fonts";
export const LIBRARY_SECTIONS: { key: LibrarySection; href: string; zhOnly?: boolean }[] = [
  { key: "styles", href: "/styles/", zhOnly: true },
  { key: "components", href: "/components" },
  { key: "effects", href: "/effects" },
  { key: "prompts", href: "/prompts" },
  { key: "resources", href: "/resources" },
  { key: "learn", href: "/learn" },
  { key: "skills", href: "/skills" },
  { key: "fonts", href: "/fonts" },
];
