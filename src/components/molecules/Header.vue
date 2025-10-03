<script setup>
import Menu from '@/components/Menu/Menu.vue'
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
  }
})
</script>
<template>
  <header class="header">
    <div class="header__content">
      <LanguagePicker
        :languages="languages"
        :lang="lang"
        class="header__lang-picker"
      />
      <img :src="logo" alt="Logo" class="header__logo" />
    	<Menu />

    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 10vh;
  position: fixed;
  background: transparent;
  z-index: 10;         // debe ser mayor que el hero
  background-color: rgba(58, 48, 48, 0.373); 


  &__content {
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  
  }

  &__logo {
    position: absolute;  // posición absoluta dentro del header
    left: 50%;           // centro horizontal del header
    top: 70%;            // centro vertical
    transform: translate(-50%, -50%); // ajusta para que el centro del logo quede en el centro del header
    width: 4rem;
    height: auto;
  }
}</style>