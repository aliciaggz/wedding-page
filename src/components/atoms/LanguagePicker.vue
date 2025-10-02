<template>
  <div class="lang-picker">
    <template v-for="(label, lang, i) in languages" :key="lang">
      <a :href="translatePath('/', lang)">{{ label }}</a>
      <span v-if="i < Object.keys(languages).length - 1" class="separator"> | </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    languages: {
      type: Object,
      required: true
    },
    translatePath: {
      type: Function,
      required: true
    }
  }
}
</script>
<style>
.lang-picker a {
  color: #666;
  text-decoration: none;
}

.lang-picker a.active {
  font-weight: bold;
  color: #000;
}

.lang-picker .separator {
  opacity: 0.6;
  margin: 0 0.25rem;
}
</style>
