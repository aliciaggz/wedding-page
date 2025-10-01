// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  i18n: {
    defaultLocale: "es", // idioma por defecto
    locales: ["es", "en"], // idiomas disponibles
    routing: {
      prefixDefaultLocale: false, // evita que "es" aparezca como /es/
    },
  }
});
