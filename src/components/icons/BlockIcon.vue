<script setup lang="ts">
import SmallSvg from './BlockSmall.vue';
import LargeSvg from './BlockLarge.vue';
const props = defineProps<{ size?: 'small' | 'large' }>();
</script>

<template>
  <div class="block-container">
    <component :is="props.size === 'large' ? LargeSvg : SmallSvg" />
  </div>
</template>
<style scoped>
.block-container {
  display: inline-block;
  line-height: 0;
  /* para evitar espacios extra alrededor del SVG */
  width: 100%;
  max-width: 40rem;
  max-width: auto;
}

/* El SVG completo se aprieta */
.rsvp-svg {
  width: 100%;
  height: auto;
  transition: transform 0.25s ease;
  transform-origin: center;
}

.rsvp-svg:hover {
  transform: scale(0.96);
}

/* Los paths vibran un poco para simular presión */
.draw-path {
  transition: stroke-dashoffset 1s ease, transform 0.25s ease, stroke-width 0.25s ease;
}

/* Efecto de “apretar” los trazos */
.rsvp-svg:hover .draw-path {
  transform: scale(0.98);
  stroke-width: 1.5;
  animation: squeeze-wiggle 0.25s ease forwards;

  /* ligeramente más grueso para el efecto */
}

@keyframes squeeze-wiggle {
  0% {
    transform: scale(1);
  }

  33% {
    transform: scale(0.97) rotate(-0.4deg);
  }

  66% {
    transform: scale(0.985) rotate(0.4deg);
  }

  100% {
    transform: scale(0.98);
  }
}
</style>