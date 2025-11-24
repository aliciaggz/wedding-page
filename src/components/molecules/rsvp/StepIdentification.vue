<script setup>
import { reactive, computed, ref } from 'vue'

const emits = defineEmits(['continue']);

const PASSWORD = "1234";
const submitted = ref(false);

// estado local de los inputs
const local = reactive({
  password: ''
})

const isValid = computed(() =>
  local.password.trim().toLowerCase() === PASSWORD.toLowerCase()
)

// function next() {
//   submitted.value = true
//   if (isValid.value) emits('continue')
// }

function next() {
  submitted.value = true
  if (isValid.value) {
    localStorage.setItem("rsvp-auth", "true")
    emits('continue')
  }
}

</script>

<template>
  <div class="step">
    <h2>RSVP – Identification</h2>

    <div class="input-group">
      <form @submit.prevent="next">
        <label>Contraseña
          <input type="password" v-model="local.password" placeholder="Escribe la contraseña" />
        </label>
        <p v-if="submitted && !isValid" class="error">
          Contraseña incorrecta. Por favor vuelve a intentarlo 💌
        </p>
        <button type="submit">Continue</button>
      </form>

    </div>

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
