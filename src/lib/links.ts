import { lp, type Lang } from "./i18n";
import type { Item } from "./content";

export const entryHref = (lang: Lang, id: string) => lp(lang, `/components/entries/${id}`);
export const patternHref = (lang: Lang, id: string) => lp(lang, `/components/patterns/${id}`);
export const promptHref = (lang: Lang, id: string) => lp(lang, `/prompts/${id}`);
export const effectHref = (lang: Lang, id: string) => lp(lang, `/effects/${id}`);

export function itemHref(lang: Lang, item: Item): string {
  switch (item.kind) {
    case "entry": return entryHref(lang, item.id);
    case "pattern": return patternHref(lang, item.id);
    case "prompt": case "scene": return promptHref(lang, item.id);
    case "effect": return effectHref(lang, item.id);
    case "resource": return lp(lang, "/resources");
    case "guide":
      if (item.guide_type === "discipline") return lp(lang, `/learn/disciplines/${item.id}`);
      if (item.guide_type === "lab") return lp(lang, `/learn/lab/${item.id}`);
      if (item.guide_type === "checklist") return lp(lang, "/learn/checklist");
      return lp(lang, `/learn/principles`) + `#${item.id}`;
    default: return lp(lang, "/");
  }
}
