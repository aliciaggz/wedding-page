<script setup>
import { ref } from 'vue'
import StepIdentification from '@/components/molecules/rsvp/StepIdentification.vue'
import StepDetails from '@/components/molecules/rsvp/StepDetails.vue'
import StepFinal from '@/components/molecules/rsvp/StepFinal.vue'

const currentStep = ref(1)

// Estado global del formulario
const guestList = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "Robert Brown"
]

const form = ref({
  guestName: "",
  email: "",
  partnerJoining: null,
  partnerName: "",
  bus: null,
  diet: "",
  attending: null
})

// Navegación
function goToStep(step) {
  currentStep.value = step
}

function handleSubmit(details) {
  // Aquí podrías hacer un fetch() real
  form.value = { ...form.value, ...details }

  // Regla simple: si ha rellenado el paso 2, está asistiendo
  form.value.attending = details.attending

  currentStep.value = 3
}
</script>

<template>
  <div class="rsvp-wrapper">
    <div v-if="currentStep === 1">
      <StepIdentification :guest-list="guestList" v-model="form.guestName" @continue="goToStep(2)" />
    </div>

    <div v-else-if="currentStep === 2">
      <StepDetails v-model="form" @submit="handleSubmit" />
    </div>

    <div v-else-if="currentStep === 3">
      <StepFinal :attending="form.attending" />
    </div>
  </div>
</template>

<style scoped>
.rsvp-wrapper {
  max-width: 520px;
  margin: 0 auto;
  padding: 1.5rem;
}
</style>
