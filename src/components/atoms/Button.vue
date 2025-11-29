<script setup lang="ts">
import { computed } from 'vue';
import BlockIcon from '@/components/icons/BlockIcon.vue';
const props = defineProps<{
  label: string;
  href?: string;
  target?: "_self" | "_blank";
  action?: "calendar" | "none";
  extraClass?: string;
  onClick?: (e: Event) => void;
}>();

const emit = defineEmits(["click"]);

const isLink = computed(() => !!props.href);

// Acción especial para calendario (Google / iOS / Android)
function handleCalendarAction() {
  // Aquí tú meterás tu lógica real del calendario
  console.log("Añadiendo al calendario...");

  // ejemplo mínimo para que veas dónde iría
  // window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+María+&+Alex", "_blank");
}

function handleClick(e: Event) {
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
    :target="isLink ? props.target : undefined" type="button" class="sketch-btn" :class="extraClass"
    @click="handleClick">
    <BlockIcon class="sketch-btn__block-icon" />
    <span class="sketch-btn__label">{{ label }}</span>
  </component>
</template>

<style scoped lang="scss">
/* Wrapper para meter tu SVG “dibujado a mano” */
.sketch-wrapper {
  position: relative;
  display: inline-block;
  // /* espacio para que el SVG sobresalga si quieres */
  // padding: 0.25rem;
}

/* Botón base */
.sketch-btn {
  position: relative;
  z-index: 2;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-family: $font-lato;
  font-weight: 700;
  font-size: $font-size-md;
  color: $color-red;
  border: none;
  border-radius: 2rem;
  // background-color: transparent;
  cursor: pointer;
  text-decoration: none;

  transition: background 0.3s ease, color 0.3s ease;

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
    position: absolute;
    top: 45%;
    left: 55%;
    transform: translate(-50%, -50%);
    /* centra horizontal y vertical */
    font-family: $font-lato;
    font-weight: 700;
    font-size: $font-size-md;
    color: $color-red;
    pointer-events: none;
    /* para que el hover/click pase al SVG/botón */
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
