<script setup lang="ts">
import { computed } from 'vue'
import RsvpStepLayout from '@/components/atoms/RsvpStepLayout.vue'
import boydancing from '@/assets/boy-dancing.svg';
import festin from '@/assets/festin.svg';
import { locale } from '@/stores/localeStore.js';
import { t } from '@/utils/i18n.js';

const currentLocale = computed<"es" | "en">(() => locale.value as "es" | "en");

const props = defineProps({
  attending: Boolean
})
</script>

<template>
  <RsvpStepLayout :image="boydancing" image-alt="Muñecos bailando">
    <div class="final-step">
      <h2 class="final-step__title">Maria & Alex</h2>
      <h3 class="final-step__subtitle">30.05.2026</h3>
      <p v-if="attending" class="final-step__text">
        <span>{{ t(currentLocale, "rsvp.final.thanks") }}</span>
        {{ t(currentLocale, "rsvp.final.attendingText") }}
      </p>

      <p v-else> <span>{{ t(currentLocale, "rsvp.final.thanksNotAttending") }}</span>
        {{ t(currentLocale, "rsvp.final.notAttendingText") }}
      </p>

      <figure class="final-step__festin">
        <img class="final-step__festin__image" :src="festin.src" alt="">
      </figure>


    </div>
  </RsvpStepLayout>
</template>

<style scoped lang="scss">
.final-step {
  text-align: center;

  &__text {
    font-family: $font-cormorant;
    font-size: $font-size-xl;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;

  }

  &__title {
    font-family: $font-cormorant;
    font-size: $font-size-4xl;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: 300;
    margin-bottom: 3rem;
  }

  &__festin {
    position: relative;
    // max-width: 32rem;
    margin-right: 0;
    width: 100%;


    &__image {
      position: absolute;
      right: 0;
      width: 100%;
      max-width: 24rem;
      height: auto;
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 524px) {
    &__festin {
      display: none;
      // padding-left: 2%;
      // padding-right: 2%;
      // margin: auto;
    }
  }
}
</style>
