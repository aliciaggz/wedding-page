<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import BurgerButton from '../atoms/BurgerButton.vue';
import Sidebar from '../Sidebar/Sidebar.vue';
import Button from '@/components/atoms/Button.vue';
import { locale } from '@/stores/localeStore.js';
import { t } from '@/utils/i18n.js';

const currentLocale = computed(() => locale.value);

const open = ref(false);
const toggleMenu = () => {
  open.value = !open.value
};

const width = ref(0);
const isDesktop = computed(() => width.value >= 1023);

onMounted(() => {
  width.value = window.innerWidth;
  window.addEventListener('resize', () => (width.value = window.innerWidth));
});

// Función auxiliar para cambiar el meta tag theme-color dinámicamente
const updateThemeColor = (color) => {
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", color);
  } else {
    // Si no existe, lo creamos (seguridad)
    const meta = document.createElement('meta');
    meta.name = "theme-color";
    meta.content = color;
    document.head.appendChild(meta);
  }
};
// --- LÓGICA NUEVA PARA IOS ---
watch(open, (isOpen) => {
  const html = document.documentElement; // Nodo <html>
  const body = document.body;
  if (isOpen) {
    // Nodo <body>
    // 1. Bloquear scroll del body para evitar que el header se vaya
    // Bloqueamos el scroll en ambos
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    // IMPORTANTE para iOS: evita que el scroll "elástico" funcione
    html.style.height = '100%';
    body.style.height = '100%';
    // 2. Cambiar el color de la UI de Safari (Notch y barra inferior) a ROJO
    updateThemeColor('#c21807');
  } else {
    html.style.overflow = '';
    body.style.overflow = '';
    html.style.height = '';
    body.style.height = '';

    updateThemeColor('#fef8f0');
  }
});
</script>
<template>
  <div class="menu">
    <!-- Menu responsive: Hamburger + Sidebar en móvil -->
    <template v-show="!isDesktop">
      <BurgerButton :isOpen="open" @toggle="toggleMenu" />
      <Sidebar :isOpen="open" @close="open = false" />
    </template>

    <!-- Menu horizontal en escritorio -->
    <nav class="menu__desktop" v-show="isDesktop">
      <ul class="menu__nav-list">
        <li>
          <a class="menu__nav-list--link" href="/">{{ t(currentLocale, "sidebar.navigation.home") }}</a>
        </li>
        <li>
          <a class="menu__nav-list--link" :href="`/${currentLocale}/travel`">
            {{ t(currentLocale,
              "sidebar.navigation.travel") }}</a>
        </li>
        <li>
          <a class="menu__nav-list--link" href="/#schedule">{{ t(currentLocale, "sidebar.navigation.schedule") }}</a>
        </li>
        <li>
          <Button extraClass='menu__nav-list__button' :href="`/${locale}/rsvp`" color="white"
            :label="t(locale, 'rsvp.title')" />
        </li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  // position: fixed;
  top: 1rem;
  right: 1rem;
  position: relative;
  z-index: 1001;

  // &__desktop {
  //   color: white;
  // }

  &__nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    &--link {
      text-decoration: none;
      color: $color-white;
      font-family: $font-cormorant;
      // font-weight: 700;
      font-size: $font-size-md;

      &:hover {
        color: $color-red;
        // text-decoration: underline;
      }
    }

    &__button {
      // margin-bottom: 5rem;
      width: 9rem;
    }

  }
}
</style>