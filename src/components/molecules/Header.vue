<script setup>
import Menu from '@/components/molecules/Menu.vue'
import LanguagePicker from '@/components/atoms/LanguagePicker.vue'

defineProps({
  languages: {
    type: Object,
  },
  lang: {
    type: String,
  },
  logo: {
    type: String,
  },
  currentPath: {
    type: String,
    default: '/'
  }
})
</script>
<template>
  <header class="header">
    <div class="header__content">
      <LanguagePicker :currentPath="currentPath" :languages="languages" :lang="lang" class="header__lang-picker" />
      <a href="/" class="header__link">
        <img :src="logo" alt="Logo" class="header__logo" />
      </a>
      <Menu />

    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  // width: 100%;
  // height: 10vh;
  // position: absolute;
  // background: transparent;
  // z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  z-index: 1001;


  &__content {
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  &__link {
    cursor: pointer;
  }

  &__logo {
    position: absolute; // posición absoluta dentro del header
    left: 50%; // centro horizontal del header
    top: 100%; // centro vertical
    transform: translate(-50%, -50%); // ajusta para que el centro del logo quede en el centro del header
    width: 6rem;
    height: auto;
    z-index: 1002; // asegúrate que el logo esté por encima también
  }

  @media (min-width: 720px) {
    &__content {
      padding: 2rem 1.5rem 0 4rem;
    }
  }
}
</style>