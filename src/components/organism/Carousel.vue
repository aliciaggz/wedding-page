<script setup>
import { ref } from "vue";

const props = defineProps({
  images: { type: Array, required: true },
});

const scrollContainer = ref(null);

const scrollNext = () => {
  if (scrollContainer.value) {
    const width = scrollContainer.value.offsetWidth;
    scrollContainer.value.scrollBy({ left: width, behavior: "smooth" });
  }
};

const scrollPrev = () => {
  if (scrollContainer.value) {
    const width = scrollContainer.value.offsetWidth;
    scrollContainer.value.scrollBy({ left: -width, behavior: "smooth" });
  }
};
</script>

<template>
  <div class="carousel-wrapper">
    <button @click="scrollPrev" class="nav-btn prev" aria-label="Anterior">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <div class="scroll-container" ref="scrollContainer">
      <div v-for="(img, index) in images" :key="index" class="slide">
        <img :src="img.src" :alt="img.alt" loading="lazy" />
      </div>
    </div>

    <button @click="scrollNext" class="nav-btn next" aria-label="Siguiente">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1rem;
  /* padding: 1rem 0; */
  /* Ocultar scrollbar */
  scrollbar-width: none;
  height: 60vh;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.slide {
  flex: 0 0 100%; /* Una imagen por vista en móvil */
  scroll-snap-align: center;
  /* border-radius: 12px; */
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

/* En pantallas más grandes, mostramos más imágenes */
@media (min-width: 768px) {
  .slide {
    flex: 0 0 calc(50% - 0.5rem);
  }

  .scroll-container {
    height: 80vh;
  }
}

@media (min-width: 1024px) {
  .slide {
    flex: 0 0 calc(70% - 0.7rem);
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Estilo de las Flechas Modernas */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  scale: 1.1;
}

.prev {
  left: 10px;
}
.next {
  right: 10px;
}

svg {
  width: 24px;
  height: 24px;
}
</style>
