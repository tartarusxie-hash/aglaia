// 头像选择器（注册表单与设置页共用）的交互逻辑。
// 标记由 src/components/AvatarPicker.astro 渲染，本模块只接线：
//   [data-avatar-id]  预设按钮；[data-avatar-upload] 隐藏 file input；
//   [data-avatar-upload-tile] 上传格；[data-avatar-upload-preview] 上传预览图；
//   [data-avatar-upload-icon] 上传格里的 "+" 图标。
// 选中态样式类名必须完整写在这里（Tailwind 按源码扫描生成，动态拼接的类名不会生成）。

export type AvatarSelection = { presetId: string | null; file: File | null };
export type AvatarUploadError = "type" | "size";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export interface AvatarPicker {
  getSelection(): AvatarSelection;
  setPreset(id: string | null): void;
  /** 设置页回填：用户当前是自定义头像时，把它显示为上传预览。 */
  setCustomPreview(url: string): void;
}

export function initAvatarPicker(
  root: HTMLElement,
  opts: { onError?: (kind: AvatarUploadError) => void } = {},
): AvatarPicker {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-avatar-id]"));
  const input = root.querySelector<HTMLInputElement>("[data-avatar-upload]");
  const tile = root.querySelector<HTMLElement>("[data-avatar-upload-tile]");
  const preview = root.querySelector<HTMLImageElement>("[data-avatar-upload-preview]");
  const icon = root.querySelector<HTMLElement>("[data-avatar-upload-icon]");

  let presetId: string | null =
    buttons.find((b) => b.getAttribute("aria-pressed") === "true")?.dataset.avatarId || null;
  let file: File | null = null;
  let previewUrl: string | null = null;

  const paint = () => {
    for (const b of buttons) {
      const on = b.dataset.avatarId === presetId;
      b.classList.toggle("ring-2", on);
      b.classList.toggle("ring-ink", on);
      b.classList.toggle("ring-offset-2", on);
      b.classList.toggle("ring-offset-white", on);
      b.setAttribute("aria-pressed", String(on));
    }
    const hasCustom = Boolean(previewUrl);
    preview?.classList.toggle("hidden", !hasCustom);
    icon?.classList.toggle("hidden", hasCustom);
    tile?.classList.toggle("ring-2", hasCustom);
    tile?.classList.toggle("ring-ink", hasCustom);
    tile?.classList.toggle("ring-offset-2", hasCustom);
    tile?.classList.toggle("ring-offset-white", hasCustom);
  };
  paint();

  const clearCustom = () => {
    if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    file = null;
    if (input) input.value = "";
    if (preview) preview.removeAttribute("src");
  };

  for (const b of buttons) {
    b.addEventListener("click", () => {
      clearCustom();
      presetId = b.dataset.avatarId || null;
      paint();
    });
  }

  input?.addEventListener("change", () => {
    const f = input.files?.[0];
    if (!f) return;
    if (!ALLOWED.includes(f.type)) {
      input.value = "";
      opts.onError?.("type");
      return;
    }
    if (f.size > MAX_BYTES) {
      input.value = "";
      opts.onError?.("size");
      return;
    }
    clearCustom();
    file = f;
    presetId = null;
    previewUrl = URL.createObjectURL(f);
    if (preview) preview.src = previewUrl;
    paint();
  });

  paint();

  return {
    getSelection: () => ({ presetId, file }),
    setPreset(id) {
      clearCustom();
      presetId = id;
      paint();
    },
    setCustomPreview(url) {
      clearCustom();
      presetId = null;
      previewUrl = url;
      if (preview) preview.src = url;
      paint();
    },
  };
}
