<script setup>
import { ref, onMounted } from "vue";
import DetailsStep from "@/components/molecules/rsvp/DetailsStep.vue";
import StepFinal from "@/components/molecules/rsvp/StepFinal.vue";

const currentStep = ref(2);
const form = ref({ attending: "yes" });

onMounted(() => {
  // const isAuth = localStorage.getItem("rsvp-auth") === "true";
  const isSubmitted = localStorage.getItem("rsvp-submitted") === "true";
  const savedAttending = localStorage.getItem("rsvp-attending");

  if (isSubmitted) {
    form.value.attending = savedAttending || "yes";
    currentStep.value = 3;
  }
});

function handleFormSubmitSuccess() {
  // Guardamos que ya se ha enviado con éxito
  localStorage.setItem("rsvp-submitted", "true");
  // Guardamos la respuesta de asistencia para mostrar el mensaje correcto en el Step 3
  localStorage.setItem("rsvp-attending", form.value.attending);

  currentStep.value = 3;
}
</script>

<template>
  <div class="rsvp-wrapper">
    <!-- <div v-if="currentStep === 1">
      <PasswordStep @continue="handleAuthSuccess" />
    </div> -->

    <div v-if="currentStep === 2">
      <DetailsStep v-model="form" @success="handleFormSubmitSuccess" />
    </div>

    <div v-else-if="currentStep === 3">
      <StepFinal :attending="form.attending" />
    </div>
  </div>
</template>

<style lang="scss">
.rsvp-wrapper {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}
</style>
