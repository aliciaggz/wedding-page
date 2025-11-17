<script setup>
import { reactive, computed, ref } from 'vue'

const props = defineProps({
  guestList: Array,
  modelValue: Object // { firstName, lastName }
})

const emits = defineEmits(['update:modelValue', 'continue'])

// estado local de los inputs
const local = reactive({
  firstName: props.modelValue?.firstName || '',
  lastName: props.modelValue?.lastName || ''
})

// estado para controlar si se pulsó el botón
const submitted = ref(false)

// nombre completo en minúsculas
const fullName = computed(() =>
  `${local.firstName.trim()} ${local.lastName.trim()}`.toLowerCase()
)

// validación insensible a mayúsculas
const isValid = computed(() =>
  props.guestList.some(guest => guest.toLowerCase() === fullName.value)
)

function updateParent() {
  emits('update:modelValue', { ...local })
}

function onInput() {
  updateParent()
}

function next() {
  submitted.value = true
  if (isValid.value) emits('continue')
}
</script>

<template>
  <div class="step">
    <h2>RSVP – Identification</h2>

    <div class="input-group">
      <label>
        First Name
        <input type="text" v-model="local.firstName" @input="onInput" placeholder="John" />
      </label>

      <label>
        Last Name
        <input type="text" v-model="local.lastName" @input="onInput" placeholder="Doe" />
      </label>
    </div>

    <!-- mensaje solo si se pulsó el botón y no es válido -->
    <p v-if="submitted && !isValid" class="error">
      Lo sentimos, no te encontramos en la lista de invitados.<br>
      Por favor revisa la ortografía o contáctanos si crees que es un error 💌
    </p>

    <button @click="next">
      Continue
    </button>
  </div>
</template>

<style scoped>
.step {
  display: block;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 1rem auto;
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
  font-family: sans-serif;
  color: #333;
}

.input-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

label {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.3rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #333;
}

.error {
  color: #c33;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}

button {
  width: 100%;
  padding: 0.6rem;
  background: #333;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #555;
}
</style>
