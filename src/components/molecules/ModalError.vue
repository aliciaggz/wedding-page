<script setup>
import { reactive, computed, ref } from 'vue'
import tired from '@/assets/tired.svg';
const emits = defineEmits(['continue']);

const submitted = ref(false);

// estado local de los inputs
const local = reactive({
  password: ''
})

const isValid = computed(() =>
  local.password.trim().toLowerCase() === PASSWORD.toLowerCase()
)

function next() {
  submitted.value = true
  if (isValid.value) {
    localStorage.setItem("rsvp-auth", "true")
    emits('continue')
  }
}

</script>

<template>
  <div class="modal-error">
    <figure>
      <img :src="tired.src" alt="Error icon" />
    </figure>
    <div class="modal-error__content-red"> 
      <p>Vaya...</p>
      <p>hemos tenido un problema</p>
    </div>
    <p>Nuestro servidor está teniendo un pequeño tropiezo.</p>
    <p>Intenta enviar el formulario de nuevo en unos minutos</p>
    <button class="modal-error__button" @click="$emit('close')">Cerrar</button>

  </div>
</template>

<style lang="scss">
.modal-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: $font-cormorant;

  &__content-red {
    color: $color-red;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: bold;
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

}
</style>
