<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import type { FormData } from '@/types/types.ts';
import ModalError from "@/components/molecules/ModalError.vue";
import Loader from '@/components/atoms/Loader.vue';
import RsvpStepLayout from '@/components/atoms/RsvpStepLayout.vue'
import coupledancing from '@/assets/couple-dancing.svg';
import { locale } from '@/stores/localeStore.js';
import { t } from '@/utils/i18n.js';

const currentLocale = computed<"es" | "en">(() => locale.value as "es" | "en");

// Creamos el formulario reactivo
const form = reactive<FormData>({
  name: '',
  lastname: '',
  email: '',
  attending: '',
  bus: '',
  partnerJoining: '',
  partnerName: '',
  allergies: '',
  comments: '',
});

// Estados para las modales
const isLoading = ref(false);
const isErrorModalVisible = ref(false);
const responseMessage = ref('');

const emits = defineEmits<{
  (e: 'update:modelValue', value: FormData): void;
  // (e: 'submit', value: FormData): void;
  (e: 'success'): void;
}>();

const isFormValid = computed(() => {
  const requiredFields = ['name', 'lastname', 'attending'];
  if (form.attending === 'yes') {
    requiredFields.push('bus', 'partnerJoining');
    if (form.partnerJoining === 'yes') {
      requiredFields.push('partnerName');
    }
  }
  return requiredFields.every((field) => form[field as keyof FormData].trim() !== '');
});

watch(form, () => {
  emits("update:modelValue", form)
}, { deep: true })

// si partner = no → borrar nombre
watch(() => form.partnerJoining, (val) => {
  if (val === "no") form.partnerName = ""
})

const attending = computed(() => form.attending)


async function handleSubmit() {
  isLoading.value = true;
  responseMessage.value = "";
  try {
    const res = await fetch('/api/confirmar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json();
    responseMessage.value = `Formulario enviado con éxito. ${data}`;

    emits('success');
  } catch (error) {
    console.error(error);
    isErrorModalVisible.value = true;
    responseMessage.value = "Hubo un error al enviar el formulario.";
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <RsvpStepLayout :image="coupledancing" image-alt="Muñecos bailando">
    <div class="details-step">
      <h2 class="details-step__title">Maria & Alex</h2>
      <h3 class="details-step__subtitle">30.05.2026</h3>
      <p class="details-step__text">{{ t(currentLocale, "rsvp.details.text") }}</p>

      <form @submit.prevent="handleSubmit">
        <input class="details-step__input" :placeholder="t(currentLocale, 'rsvp.details.name')" id="name"
          v-model="form.name" type="text" required />
        <input class="details-step__input" id="lastname" v-model="form.lastname"
          :placeholder="t(currentLocale, 'rsvp.details.lastname')" type="text" required />
        <input class="details-step__input" id="email" v-model="form.email"
          :placeholder="t(currentLocale, 'rsvp.details.email')" type="email" required />

        <div class="details-step__group">
          <p class="details-step__question">{{ t(currentLocale, "rsvp.details.question.attending") }}</p>
          <div class="details-step__radio-options">
            <label class="details-step__radio-label">
              <input type="radio" value="yes" v-model="form.attending" required />
              <span>{{ t(currentLocale, "rsvp.details.answer.oc") }}</span>
            </label>
            <label class="details-step__radio-label">
              <input type="radio" value="no" v-model="form.attending" required />
              <span>{{ t(currentLocale, "rsvp.details.answer.not") }}</span>
            </label>
          </div>
        </div>

        <div v-if="form.attending === 'yes'" class="details-step__conditional">
          <div class="details-step__group">
            <p class="details-step__question">{{ t(currentLocale, "rsvp.details.question.bus") }}</p>
            <div class="details-step__radio-options">
              <label class="details-step__radio-label">
                <input type="radio" value="yes" v-model="form.bus" required />
                <span>{{ t(currentLocale, "rsvp.details.answer.yes") }}</span>
              </label>
              <label class="details-step__radio-label">
                <input type="radio" value="no" v-model="form.bus" required />
                <span>{{ t(currentLocale, "rsvp.details.answer.no") }}</span>
              </label>
            </div>
          </div>

          <div class="details-step__group">
            <p class="details-step__question">{{ t(currentLocale, "rsvp.details.question.partner") }}</p>
            <div class="details-step__radio-options">
              <label class="details-step__radio-label">
                <input type="radio" value="yes" v-model="form.partnerJoining" required />
                <span>{{ t(currentLocale, "rsvp.details.answer.yes") }}</span>
              </label>
              <label class="details-step__radio-label">
                <input type="radio" value="no" v-model="form.partnerJoining" required />
                <span>{{ t(currentLocale, "rsvp.details.answer.no") }}</span>
              </label>
            </div>
          </div>

          <div v-if="form.partnerJoining === 'yes'" class="details-step__subgroup">
            <input class="details-step__input" :placeholder="t(currentLocale, 'rsvp.details.partnerName')"
              id="partnerName" v-model="form.partnerName" type="text" required />
          </div>
        </div>

        <input class="details-step__input" :placeholder="t(currentLocale, 'rsvp.details.question.diet')" id="allergies"
          v-model="form.allergies" type="text" />

        <textarea class="details-step__input" :placeholder="t(currentLocale, 'rsvp.details.question.comment')"
          id="comments" v-model="form.comments"></textarea>

        <div class="details-step__buttons">
          <a class="details-step__back-button" href="/">{{ t(currentLocale, "rsvp.buttonBack") }}</a>
          <button class="details-step__button" type="submit" :disabled="!isFormValid">{{ t(currentLocale,
            "rsvp.buttonLabel") }}</button>
        </div>
      </form>
      <Loader v-if="isLoading" />
      <ModalError v-if="isErrorModalVisible" @close="isErrorModalVisible = false" />
    </div>
  </RsvpStepLayout>
</template>

<style lang="scss">
.details-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  font-family: $font-serif;
  font-size: $font-size-md;
  color: $color-text;
  text-align: center;

  &__text {
    font-family: $font-cormorant;
    font-size: $font-size-md;
    margin-bottom: 2rem;
  }

  &__title {
    font-family: $font-cormorant;
    font-size: $font-size-4xl;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-family: $font-serif;
    font-size: $font-size-lg;
    font-weight: 300;
    margin-bottom: 4rem;
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

  &__group {
    margin-bottom: 1.5rem;
    width: 100%;
    text-align: left;
  }

  &__conditional {
    width: 100%;
    animation: fadeIn 0.3s ease-in-out;
  }

  &__question {
    font-family: $font-cormorant;
    margin-bottom: 0.8rem;
    display: block;
    font-size: $font-size-md;
  }

  &__radio-options {
    display: flex;
    gap: 2rem; // Separación entre Sí y No
    justify-content: flex-start; // Alineados a la izquierda
  }

  &__radio-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    font-family: $font-cormorant;
    font-size: $font-size-md;


    input[type="radio"] {
      margin: 0;
      margin-right: 0.5rem;
      accent-color: $color-red; // Color del puntito seleccionado
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
    }

    span {
      padding-top: 2px; // Pequeño ajuste visual vertical
    }

    &:hover {
      opacity: 0.8;
    }
  }
}


/* Focus bonito */
input:focus,
textarea:focus {
  outline: none;
  border-color: #4f8cff;
  box-shadow: 0 0 0 3px rgba(79, 140, 255, 0.25);
  background: white;
}

/* Radios */
div>label>input[type="radio"] {
  margin-right: 0.4rem;
  accent-color: $color-text;
}

button:disabled {
  background: #945d5d89;
  cursor: not-allowed;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
