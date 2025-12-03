<!-- <template>
<div class="menu">
  <BurgerButton :isOpen="open" @toggle="toggleMenu" />
  <Sidebar :isOpen="open" />
  
</div>
  
</template> -->

<template>
  <div class="menu">
    <!-- Menu responsive: Hamburger + Sidebar en móvil -->
    <div class="mobile-menu" v-if="!isDesktop">
      <BurgerButton :isOpen="open" @toggle="toggleMenu" />
      <Sidebar :isOpen="open" @close="open = false" />
    </div>

    <!-- Menu horizontal en escritorio -->
    <nav class="desktop-menu" v-else>
      <ul class="menu__nav-list">
        <li><a class="menu__nav-list--link" href="/">{{ t(currentLocale, "sidebar.navigation.home") }}</a></li>
        <li><a class="menu__nav-list--link" href="/travel">{{ t(currentLocale, "sidebar.navigation.travel") }}</a></li>
        <li><a class="menu__nav-list--link" href="/#schedule">{{ t(currentLocale, "sidebar.navigation.schedule") }}</a>
        </li>
        <li> <Button extraClass='sidebar__button' :href="`/${locale}/rsvp`" color="white"
            :label="t(locale, 'rsvp.title')" />
        </li>
      </ul>
    </nav>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import BurgerButton from '../atoms/BurgerButton.vue';
import Sidebar from '../Sidebar/Sidebar.vue';
import Button from '@/components/atoms/Button.vue';

const open = ref(false);
const toggleMenu = () => {
  open.value = !open.value
};

const width = ref(0); // inicializamos a 0
const isDesktop = computed(() => width.value >= 900);

onMounted(() => {
  width.value = window.innerWidth; // solo se ejecuta en cliente
  window.addEventListener('resize', () => (width.value = window.innerWidth));
});
</script>
<style lang="scss" scoped>
.menu {
  // position: fixed;
  top: 1rem;
  right: 1rem;
  position: relative;
  z-index: 1001;

  &__nav-list {
    list-style: none;
    display: flex;
    gap: 2rem;

    &--link {
      text-decoration: none;
      color: $color-white;
      font-family: $font-cormorant;
      // font-weight: 700;
      font-size: $font-size-md;

      &:hover {
        color: $color-red;
      }
    }
  }
}
</style>