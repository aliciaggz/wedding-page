<script setup lang="ts">
import { computed } from 'vue';
import BlockIcon from '@/components/icons/BlockIcon.vue';
import { addToCalendar } from '@/utils/calendar.ts';

const props = withDefaults(
  defineProps<{
    label: string;
    href?: string;
    target?: "_self" | "_blank";
    action?: "calendar" | "none";
    extraClass?: string;
    size?: 'small' | 'large';
    color?: 'red' | 'white';
    onClick?: (e: Event) => void;
  }>(),
  {
    color: 'red'
  }
);

const emit = defineEmits(["click"]);

const isLink = computed(() => !!props.href);



function handleCalendarAction() {
  addToCalendar({
    title: "Boda María & Alex",
    description: "Nos encantaría que vinieras a nuestra boda",
    location: "Parque de la Marquesa, Carretera B-10, Km 4.3, 30612 Ulea, Murcia, España",
    start: new Date("2026-05-30T13:00:00"),
    end: new Date("2026-05-30T00:00:00")
  });
}


function handleClick(e: Event) {
  console.log('handleClick disparado', props.action);

  if (props.action === "calendar") {
    e.preventDefault();
    handleCalendarAction();
    return;
  }

  if (props.onClick) props.onClick(e);
  emit("click", e);
}
</script>

<template>
  <component :is="isLink ? 'a' : 'button'" :href="isLink ? props.href : undefined"
    :target="isLink ? props.target : undefined" type="button" class="sketch-btn"
    :class="[extraClass, `sketch-btn--${props.color}`]" @click="handleClick">
    <BlockIcon class="sketch-btn__block-icon" :size="props.size" :color="props.color" />
    <span class="sketch-btn__label" :class="props.color">{{ label }}</span>
  </component>
</template>

<style scoped lang="scss">
.sketch-wrapper {
  position: relative;
  display: inline-block;
}

.sketch-btn {
  position: relative;
  z-index: 2;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-family: $font-lato;
  font-weight: 700;
  font-size: $font-size-md;
  // color: $color-red;
  border: none;
  border-radius: 2rem;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;

  &--red {
    color: $color-red;
  }

  &--white {
    color: $color-white;
  }

  &__block-icon {
    display: block;
    width: 100%;
    height: auto;
    // width: 1.5rem;
    // height: 0.875rem; // Mantener proporción del SVG
    // margin-right: 0.5rem;
    // vertical-align: middle;
    // stroke: $color-red;
  }

  &__label {
    width: 100%;
    position: absolute;
    top: 45%;
    left: 54%;
    transform: translate(-50%, -50%);
    /* centra horizontal y vertical */
    font-family: $font-lato;
    font-weight: 700;
    font-size: $font-size-md;
    pointer-events: none;

    &.red {
      color: $color-red;
    }

    &.white {
      color: $color-white;
    }
  }
}

// /* Hover general */
// .sketch-btn:hover {
//   background: $color-blue-electric;
//   color: $color-black;
// }

/* Aquí puedes enganchar animaciones del SVG */
// .sketch-wrapper:hover svg {
//   /* animation: wiggle 0.4s ease; */
// }</style>
