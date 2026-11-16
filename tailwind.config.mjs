/** Tailwind 配置：颜色全部来自 tokens/tokens.json 生成的 CSS 变量（亮白底 + 中性冷灰，用户 2026-11-12 定，米白退役）。 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,md}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-background)",
        surface: "var(--color-surface)",
        subtle: "var(--color-surface-subtle)",
        ink: "var(--color-ink-primary)",
        ink2: "var(--color-ink-secondary)",
        muted: "var(--color-ink-muted)",
        line: "var(--color-line)",
        linestrong: "var(--color-line-strong)",
        primary: "var(--color-primary)",
        onprimary: "var(--color-on-primary)",
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
        mono: "var(--font-family-mono)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      transitionTimingFunction: {
        expo: "var(--motion-easing-ease-out-expo)",
        back: "var(--motion-easing-ease-out-back)",
        inout2: "var(--motion-easing-ease-in-out)",
      },
    },
  },
  plugins: [],
};
