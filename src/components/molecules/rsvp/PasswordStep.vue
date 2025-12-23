<script setup>
import { reactive, computed, ref } from 'vue'
import RsvpStepLayout from '@/components/atoms/RsvpStepLayout.vue'
import coupledancing from '@/assets/couple-dancing.svg';
import { locale } from '@/stores/localeStore.js';
import { t } from '@/utils/i18n.js';

const currentLocale = computed(() => locale.value);


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

function next() {
  submitted.value = true
  if (isValid.value) {
    localStorage.setItem("rsvp-auth", "true")
    emits('continue')
  }
}

</script>

<template>
  <RsvpStepLayout :image="coupledancing" image-alt="Muñecos bailando">
    <div class="password-step">

      <h2 class="password-step__title">Maria & Alex</h2>
      <h3 class="password-step__subtitle">30.05.2026</h3>
      <p class="password-step__text">{{ t(currentLocale, "rsvp.password.text") }}</p>

      <form class="password-step__form" @submit.prevent="next">
        <input class="password-step__input" type="password" v-model="local.password"
          placeholder="Escribe la contraseña" />
        <p v-if="submitted && !isValid" class="error">
          {{ t(currentLocale, "rsvp.password.invalidPassword") }}
        </p>
        <div class="password-step__buttons">
          <a class="password-step__back-button" href="/">{{ t(currentLocale, "rsvp.buttonBack") }}</a>
          <button class="password-step__button" type="submit">{{ t(currentLocale, "rsvp.buttonLabel") }}</button>
        </div>
      </form>
    </div>
  </RsvpStepLayout>
</template>

<style lang="scss">
.password-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  // display: block;
  // padding: 1.5rem;
  // background: #f8f8f8;
  // border-radius: 8px;
  // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  // max-width: 400px;
  // margin: 1rem auto;

  &__figure {
    margin-inline: auto;
    margin-bottom: 1.6rem;
    width: 150px;
  }

  &__text {
    font-family: $font-cormorant;
    font-size: $font-size-md;
    margin-bottom: 1rem;
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

  &__buttons {
    display: flex;
    width: 100%;
    justify-content: space-between;
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

  &__back-button {
    margin-top: 1rem;
    background-color: $color-background;
    color: $color-text;
    font-family: $font-cormorant;
    border: $color-text 1px solid;
    cursor: pointer;
    padding: 0.5rem 2rem;
    border-radius: 5rem;
    font-size: $font-size-md;
    text-decoration: none;
  }

  &__form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    flex-direction: column;
  }

  &__input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    font-family: $font-cormorant;
    border: 1px solid $color-text;
    background-color: transparent;
    border-radius: 4px;
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
