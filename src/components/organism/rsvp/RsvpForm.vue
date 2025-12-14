<script setup>
import { ref } from 'vue'
import StepIdentification from '@/components/molecules/rsvp/StepIdentification.vue'
import StepDetails from '@/components/molecules/rsvp/StepDetails.vue'
import StepFinal from '@/components/molecules/rsvp/StepFinal.vue'

const currentStep = ref(1)

const form = ref({
  guestName: "",
  email: "",
  partnerJoining: null,
  partnerName: "",
  bus: null,
  diet: "",
  attending: null
})

// const authenticated = ref(localStorage.getItem("rsvp-auth") === "true")

// Navegación
function goToStep(step) {
  currentStep.value = step

  // if (step === 2) {
  //   authenticated.value = true
  // }
}

// function handleSubmit(details) {
//   form.value = { ...form.value, ...details }

//   // Regla simple: si ha rellenado el paso 2, está asistiendo
//   form.value.attending = details.attending

//   currentStep.value = 3
// }
</script>

<template>
  <div class="rsvp-wrapper">
    <div v-if="currentStep === 1">
      <StepIdentification v-if="!authenticated" @continue="goToStep(2)" />
    </div>

    <div v-else-if="currentStep === 2">
      <StepDetails v-model="form" />
    </div>

    <div v-else-if="currentStep === 3">
      <StepFinal :attending="form.attending" />
    </div>
  </div>
</template>

<style lang="scss">
.rsvp-wrapper {
  max-width: 520px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
