<template>
  <button class="btn" :class="`btn--${type}`" @click="$emit('click')">
    <slot></slot>
  </button>
</template>
<script setup>
</script>