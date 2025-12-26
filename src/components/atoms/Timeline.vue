<script setup>
import car from '@/assets/car.svg'
import rings from '@/assets/rings.svg'
import cheese from '@/assets/cheese.svg'
import mirrorball from '@/assets/mirrorball.svg'
import { t } from '@/utils/i18n';
import { ref, computed } from 'vue'

import { locale } from '@/stores/localeStore.js';
const currentLocale = computed(() => locale.value);

const events = computed(() => [
  {
    time: t(currentLocale.value, "schedule.timeline.ceremony.time"),
    title: t(currentLocale.value, "schedule.timeline.ceremony.title"),
    text: "",
    icon: ""
  },
  {
    time: t(currentLocale.value, "schedule.timeline.arrival.time"),
    title: t(currentLocale.value, "schedule.timeline.arrival.title"),
    text: t(currentLocale.value, "schedule.timeline.arrival.text"),
    icon: car
  },
  {
    time: t(currentLocale.value, "schedule.timeline.start.time"),
    title: t(currentLocale.value, "schedule.timeline.start.title"),
    text: t(currentLocale.value, "schedule.timeline.start.text"),
    icon: rings
  },
  {
    time: t(currentLocale.value, "schedule.timeline.food.time"),
    title: t(currentLocale.value, "schedule.timeline.food.title"),
    text: t(currentLocale.value, "schedule.timeline.food.text"),
    icon: cheese
  },
  {
    time: t(currentLocale.value, "schedule.timeline.party.time"),
    title: t(currentLocale.value, "schedule.timeline.party.title"),
    text: t(currentLocale.value, "schedule.timeline.party.text"),
    icon: mirrorball
  },
  {
    time: t(currentLocale.value, "schedule.timeline.end.time"),
    title: t(currentLocale.value, "schedule.timeline.end.title"),
    text: t(currentLocale.value, "schedule.timeline.end.text"),
    icon: ""
  },
]);
</script>
<template>
  <div class="timeline">
    <div class="timeline-line"></div>
    <div class="timeline-item" v-for="(event, i) in events" :key="i" :class="i % 2 === 0 ? 'left' : 'right'">
      <div class="content">
        <span class="time">{{ event.time }}</span>
        <h3 class="title">{{ event.title }}</h3>
        <p class="text">{{ event.text }}</p>
      </div>
      <img v-if="event.icon" class="icon" :src="event.icon.src" alt="" />
      <div class="dot"></div>
    </div>
  </div>
</template>
<style lang="scss">
.timeline {
  position: relative;
  width: 100%;
  display: grid;
  gap: 3rem;
  margin-top: 2.5rem;
  margin-bottom: 4rem;
}

/* Línea vertical */
.timeline-line {
  position: absolute;
  top: 10px;
  bottom: 0;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background-color: $color-red;
}

/* Cada evento */
.timeline-item {
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  /* Mantiene alineación a los lados */
  &.left {
    .content {
      grid-column: 1;
      text-align: right;
      margin-right: 1rem;

    }

    .icon {
      grid-column: 2;
    }
  }

  &.right {
    .content {
      grid-column: 2;
      text-align: left;
      margin-left: 1rem;
    }

    .icon {
      grid-row: 1;
    }
  }
}

/* Dots */
.dot {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: $color-red;
  box-shadow: 0 0 0 3px $color-red;
  transform: translate(-50%, -50%);
}

/* Iconos */
.icon {
  min-width: 5rem;
  height: auto;
  justify-self: center;
  object-fit: contain;
}

/* Tipografía */
.time {
  font-size: $font-size-base;
  color: $color-text;
  font-weight: 300;
  color: $color-red;

  font-family: $font-lato;

}

.title {
  font-family: $font-lato;
  font-weight: 300;
  color: $color-red;
  font-size: $font-size-md;
  margin: 0.4rem 0;
}

.text {
  font-family: $font-cormorant;
  color: $color-text;
  font-size: $font-size-md;
  max-width: 260px;
  margin: auto;
}
</style>