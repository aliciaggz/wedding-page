// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import path from "path";

const isVercel = process.env.VERCEL === "1";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
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
  base: isVercel ? "/" : "/wedding-page",
  site: isVercel
    ? "https://alex-maria-wedding.vercel.app"
    : "https://aliciaggz.github.io/wedding-page",
});
