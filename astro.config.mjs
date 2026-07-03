import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://portfolio-new.vercel.app",
  base: "/",
  output: "static",
  build: { assets: "assets" },
});
