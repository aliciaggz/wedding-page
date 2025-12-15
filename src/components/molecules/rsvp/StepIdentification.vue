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
  <div class="password-step">
    <h2 class="password-step__title">Maria & Alex</h2>
    <h3 class="password-step__subtitle">30.05.2026</h3>
    <p class="password-step__text">Por favor, introduzca la contraseña</p>

    <form class="password-step__form" @submit.prevent="next">
      <input class="password-step__input" type="password" v-model="local.password"
        placeholder="Escribe la contraseña" />
      <p v-if="submitted && !isValid" class="error">
        Contraseña incorrecta. Por favor, inténtalo de nuevo
      </p>
      <button class="password-step__button" type="submit">Enviar</button>
    </form>
  </div>
</template>

<style lang="scss">
.password-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // display: block;
  // padding: 1.5rem;
  // background: #f8f8f8;
  // border-radius: 8px;
  // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  // max-width: 400px;
  // margin: 1rem auto;

  &__text {
    font-family: $font-cormorant;
    font-size: $font-size-md;
  }

  &__title {
    font-family: $font-cormorant;
    font-size: $font-size-4xl;
    font-weight: 300;
    // margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }

  &__button {
    margin-top: 1rem;
    background-color: $color-red;
    color: $color-white;
    font-family: $font-cormorant;
    border: none;
    cursor: pointer;
    padding: 0.5rem 2rem;
    border-radius: 5rem;
    font-size: $font-size-md;
  }

  &__form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
  }

  &__input {
    padding: 0.5rem;
    font-size: 1rem;
    font-family: $font-cormorant;
    border: 1px solid $color-text;
    background-color: transparent;
    border-radius: 4px;
    margin-top: 0.3rem;
    margin-bottom: 1.5rem;
    outline: none;
    transition: border-color 0.2s;
    font-size: $font-size-md;
  }

}


h3 {
  margin-bottom: 1rem;
  text-align: center;
  font-family: Source Serif Pro;
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
  font-family: $font-cormorant;
  border: 1px solid #C21807;
  border-radius: 4px;
  margin-top: 0.3rem;
  margin-bottom: 1.5rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #C21807;
}

.error {
  color: #C21807;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
