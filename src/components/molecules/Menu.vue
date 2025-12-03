<script setup>
import { ref, computed, onMounted } from 'vue';
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
  console.log(width.value);

  width.value = window.innerWidth;
  window.addEventListener('resize', () => (width.value = window.innerWidth));
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