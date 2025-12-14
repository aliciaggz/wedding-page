<script setup>
import { computed } from 'vue';
import Button from '@/components/atoms/Button.vue';
import { t } from '@/utils/i18n.js';
import { locale } from '@/stores/localeStore.js';

const currentLocale = computed(() => locale.value);

defineProps({
  isOpen: Boolean
})
</script>
<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <nav class="sidebar__menu">
      <ul>
        <li><a href="/">{{ t(currentLocale, "sidebar.navigation.home") }}</a></li>
        <li><a href="/travel">{{ t(currentLocale, "sidebar.navigation.travel") }}</a></li>
        <li><a href="/#schedule">{{ t(currentLocale, "sidebar.navigation.schedule") }}</a></li>
      </ul>
      <Button extraClass='sidebar__button' :href="`/${locale}/rsvp`" color="white" :label="t(locale, 'rsvp.title')" />

    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100vh;
  background: $color-red;
  color: white;
  transition: left 0.3s ease;
  padding: 2rem;
  z-index: 1000;


  &__menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__button {
    width: 9rem;
    position: fixed;
    bottom: 8rem;
  }

  &.open {
    left: 0;
  }

  nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    li {

      a {
        color: $color-white;
        text-decoration: none;
        font-family: $font-cormorant;
        font-weight: 300;
        font-size: $font-size-3xl;
      }
    }
  }
}
</style>
