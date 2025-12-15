<script setup>
import { locale } from '@/stores/localeStore.js';
import { t } from '@/utils/i18n.js';
import Flower from '@/components/icons/Flower.vue';
// const currentLocale = computed(() => locale.value);


</script>
<template>
  <div class="loader">
    <Flower class="loader__icon" />
    <p class="loader__text">{{ t(locale, "loader.text") }}</p>
  </div>
</template>

<style lang="scss">
.loader {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;

  &__text {
    font-family: $font-serif;
    font-size: $font-size-md;
    color: $color-red;
  }
}
</style>