// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"], // idiomas disponibles
    routing: {
      prefixDefaultLocale: false, // evita que "es" aparezca como /es/
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `
      },
      },
    },
  },
  site: 'https://aliciaggz.github.io/wedding-page/',
  base: '/wedding-page/',
  
});
