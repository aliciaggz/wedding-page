<template>
  <button class="burger" :class="{ open: isOpen }" @click="$emit('toggle')" aria-label="Toggle menu">
    <span class="burger__line"></span>
    <span class="burger__line"></span>
  </button>
</template>

<script setup>
defineProps({
  isOpen: Boolean
})
</script>

<style lang="scss" scoped>
.burger {
  position: relative;   
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;
  height: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &__line {
    height: 0.05rem;
    width: 100%;
    background-color: $color-white;
    border-radius: 0.1rem;
    transition: all 0.3s ease;
  }

  &.open {
    .burger__line:nth-child(1) {
      transform: rotate(45deg) translate(10px, 10px);
    }
    .burger__line:nth-child(2) {
      transform: rotate(-45deg);
    }
  }
}
</style>
