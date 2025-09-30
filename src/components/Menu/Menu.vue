<template>
<div class="menu">
  <BurgerButton :isOpen="open" @toggle="toggleMenu" />
  <Sidebar :isOpen="open" />
</div>
  
</template>

<script setup>
import { ref } from 'vue';
import BurgerButton from '../BurgerButton/BurgerButton.vue';
import Sidebar from '../Sidebar/Sidebar.vue';

const open = ref(false);
const toggleMenu = () => {
  open.value = !open.value
};
</script>
<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

</style>