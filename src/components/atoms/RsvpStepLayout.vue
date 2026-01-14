<script setup>
defineProps({
  image: {
    type: Object,
    required: true,
  },
  imageAlt: {
    type: String,
    default: "Ilustración de boda",
  },
});
</script>

<template>
  <div class="step-layout">
    <figure class="step-layout__figure">
      <img :src="image.src" :alt="imageAlt" />
    </figure>

    <div class="step-layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 2rem;
  width: 100%;

  &__figure {
    margin-inline: auto;
    margin-bottom: 1.6rem;
    // width: 150px;
    // height: auto;

    img {
      width: 100%;
      height: auto;
    }
  }

  &__content {
    width: 100%;
    max-width: 40rem;
  }
}
</style>
