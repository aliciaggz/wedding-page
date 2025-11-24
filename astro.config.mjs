// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import path from "path";
import node from "@astrojs/node";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  output: "server",
  adapter: node({ mode: "standalone" }),
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"], // idiomas disponibles
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `,
        },
      },
    },
  },
  site: isProd
    ? "https://aliciaggz.github.io/wedding-page/"
    : "http://localhost:4321",
  base: isProd ? "/wedding-page" : "/",
});
