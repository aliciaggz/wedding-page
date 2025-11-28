<script setup>
const props = defineProps({
  attending: Boolean
})
</script>

<template>
  <div class="step">
    <h2 v-if="attending">
      🎉 Thank you for confirming! We can’t wait to celebrate with you!
    </h2>

    <h2 v-else>
      💌 Thank you for letting us know. You'll be in our thoughts.
    </h2>
  </div>
</template>

<style scoped>
.step {
  text-align: center;
  padding: 2rem 0;
}
</style>
