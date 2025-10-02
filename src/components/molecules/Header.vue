<script setup>
import Menu from '@/components/Menu/Menu.vue'
import LanguagePicker from '@/components/atoms/LanguagePicker.vue'

defineProps({
  languages: {
    type: Object,
  },
  lang: {
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
    	<Menu />

    </div>
  </header>
</template>
<style lang="scss" scoped>
.header {
  height: 10vh;
  background-color: red;
}</style>