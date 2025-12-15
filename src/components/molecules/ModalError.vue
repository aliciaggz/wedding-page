<script setup>
import { reactive, computed, ref } from 'vue'
import tired from '@/assets/tired.svg';

const emit = defineEmits(['close'])

defineProps({
  open: Boolean
})

const close = () => {
  emit('close')
}


</script>

<template>
  <teleport to="body">
    <div class="modal-overlay">
      <div class="modal-error">
        <figure class="modal-error__figure">
          <img :src="tired.src" alt="Error icon" />
        </figure>
        <div class="modal-error__content-red">
          <p>Vaya...</p>
          <p>hemos tenido un problema</p>
        </div>
        <p>Nuestro servidor está teniendo un pequeño tropiezo.</p>
        <p>Intenta enviar el formulario de nuevo en unos minutos</p>
        <button class="modal-error__button" @click="close()">Cerrar</button>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  /* fondo transparente oscuro */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: $font-serif;
  background-color: $color-background;
  border-radius: 0.5rem;
  padding: 2.5rem;
  margin-inline: 1rem;
  text-align: center;
  font-size: $font-size-md;
  line-height: 2rem;
  gap: 2.5rem;

  &__figure {
    margin: 0;
    width: 4.5rem;
    height: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__content-red p {
    margin: 0;
    color: $color-red;
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
