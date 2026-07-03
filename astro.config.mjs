import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://abel-castill0.github.io",
  base: "/Portafolio",
  output: "static",
  build: { assets: "assets" },
});
