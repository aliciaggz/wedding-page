<script setup>
import { locale } from '@/stores/localeStore.js';
import { t } from '@/utils/i18n.js';
import Flower from '@/components/icons/Flower.vue';
// const currentLocale = computed(() => locale.value);


</script>
<template>
  <teleport to="body">
    <div class="modal-overlay">
      <div class="loader">
        <Flower class="loader__icon" />
        <p class="loader__text">{{ t(locale, "loader.text") }}</p>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
.loader {
  background-color: $color-white;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  padding: 2.5rem;
  border-radius: 0.5rem;


  &__icon {
    margin-bottom: 1.5rem;
  }

  &__text {
    font-family: $font-serif;
    font-size: $font-size-md;
    color: $color-red;
    text-align: center;
  }
}
</style>