<script setup>
import { reactive, watch, computed, ref } from 'vue'

const props = defineProps({
  modelValue: Object
})
const emits = defineEmits(['update:modelValue', 'submit'])

const local = reactive(JSON.parse(JSON.stringify(props.modelValue)))

// actualizar padre cuando cambie algo
watch(local, () => {
  emits("update:modelValue", local)
}, { deep: true })

// si partner = no → borrar nombre
watch(() => local.partnerJoining, (val) => {
  if (val === "no") local.partnerName = ""
})

// regla final: asistencia
const attending = computed(() => {
  // si rellenó paso 2, se asume que asiste
  return true
})

// function onSubmit() {
//   emits("submit", {
//     ...local,
//     attending: attending.value
//   })
// }

const submitting = ref(false)
const responseMessage = ref("")
const showFinalStep = ref(false) // controla Step 3

// actualizar padre cuando cambie algo
watch(local, () => {
  emits("update:modelValue", local)
}, { deep: true })

watch(() => local.partnerJoining, (val) => {
  if (val === "no") local.partnerName = ""
})

// Enviar datos a tu endpoint
async function onSubmit() {
  submitting.value = true
  try {
    const res = await fetch('/api/confirmar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...local,
        attending: attending.value
      })
    })
    const data = await res.json()
    responseMessage.value = data.mensaje
    showFinalStep.value = true
  } catch (err) {
    console.error(err)
    responseMessage.value = "⚠️ Error al enviar la confirmación"
    showFinalStep.value = true
  } finally {
    submitting.value = false
  }
}

</script>

<template>
  <div class="step">
    <h2>Confirm your details</h2>

    <!-- Email -->
    <label>
      Email address*
      <input type="email" v-model="local.email" required />
    </label>

    <!-- Partner -->
    <fieldset>
      <legend>Partner joining?*</legend>
      <label><input type="radio" value="yes" v-model="local.partnerJoining" /> Yes</label>
      <label><input type="radio" value="no" v-model="local.partnerJoining" /> No</label>
    </fieldset>

    <label v-if="local.partnerJoining === 'yes'">
      Partner name
      <input type="text" v-model="local.partnerName" />
    </label>

    <!-- Bus -->
    <fieldset>
      <legend>Will you be taking the bus?*</legend>
      <label><input type="radio" value="yes" v-model="local.bus" /> Yes</label>
      <label><input type="radio" value="no" v-model="local.bus" /> No</label>
    </fieldset>

    <label>
      Dietary requirements (optional)
      <textarea rows="3" v-model="local.diet"></textarea>
    </label>

    <button @click="onSubmit">
      Submit RSVP
    </button>
  </div>
</template>

<style scoped>
button {
  width: 100%;
  margin-top: 1rem;
}

.guest-extra {
  margin: 1rem 0;
}
</style>
