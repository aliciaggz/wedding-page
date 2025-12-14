<template>
  <div class="lang-picker">
    <template v-for="(label, key, i) in languages" :key="key">
      <a :href="translatePath('/', key)">{{ label.slice(0, 2) }}</a>
      <span v-if="i < Object.keys(languages).length - 1" class="separator"> | </span>
    </template>
  </div>
</template>

<script setup>
import { useTranslatedPath } from '@/utils/i18n';

const props = defineProps({
  languages: Object,
  lang: {
    type: String,
    default: 'es',
  }
})

const translatePath = useTranslatedPath(props.lang);

</script>
<style lang="scss" scoped>
.lang-picker {
  font-family: $font-serif;
  font-size: $font-size-lg;
  font-weight: 300;
  text-transform: uppercase;
  top: 0;
  z-index: 1002;
  margin-top: 2.5rem;


  & a {
    color: $color-white;
    text-decoration: none;

    &.active {
      font-weight: bold;
      color: $color-red;
    }

    &:hover {
      color: $color-red;

    }
  }

  & .separator {
    color: $color-white;
    opacity: 0.6;
    margin: 0 0.25rem;
  }

}
</style>
