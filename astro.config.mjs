import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// 静态优先（规格 §8.1）。双语由目录手工镜像（/ 与 /en/），首访默认中文，不做语言协商重定向。
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  output: "static",
  build: { format: "directory" },
});
