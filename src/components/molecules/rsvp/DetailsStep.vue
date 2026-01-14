<script setup lang="ts">
import { reactive, watch, computed, ref } from "vue";
import type { FormData } from "@/types/types.ts";
import ModalError from "@/components/molecules/ModalError.vue";
import Loader from "@/components/atoms/Loader.vue";
import RsvpStepLayout from "@/components/atoms/RsvpStepLayout.vue";
import girldancing from "@/assets/girl-dancing.svg";
import { locale } from "@/stores/localeStore.js";
import { t } from "@/utils/i18n.js";

const currentLocale = computed<"es" | "en">(() => locale.value as "es" | "en");

// Creamos el formulario reactivo
const form = reactive<FormData>({
  name: "",
  lastname: "",
  email: "",
  attending: "",
  bus: "",
  partnerJoining: "",
  partnerName: "",
  allergies: "",
  comments: "",
});

// Estados para las modales
const isLoading = ref(false);
const isErrorModalVisible = ref(false);
const responseMessage = ref("");
const submitted = ref(false);

const emits = defineEmits<{
  (e: "update:modelValue", value: FormData): void;
  // (e: 'submit', value: FormData): void;
  (e: "success"): void;
}>();

watch(
  form,
  () => {
    emits("update:modelValue", form);
  },
  { deep: true }
);

// si partner = no → borrar nombre
watch(
  () => form.partnerJoining,
  (val) => {
    if (val === "no") form.partnerName = "";
  }
);

const attending = computed(() => form.attending);

const validationErrors = computed(() => {
  const errors: Record<string, string> = {};

  // Validación Nombre
  if (!form.name.trim()) errors.name = "required";

  // Validación Apellido
  if (!form.lastname.trim()) errors.lastname = "required";

  // Validación Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (form.email != "" && !emailRegex.test(form.email)) {
    errors.email = "format";
  }

  // Validación Asistencia
  if (!form.attending) errors.attending = "required";

  if (form.attending === "yes") {
    if (!form.bus) errors.bus = "required";
    if (!form.partnerJoining) errors.partnerJoining = "required";

    if (form.partnerJoining === "yes" && !form.partnerName.trim()) {
      errors.partnerName = "required";
    }
  }

  return errors;
});

async function handleSubmit() {
  submitted.value = true;

  if (Object.keys(validationErrors.value).length > 0) {
    // Opcional: Scrollear al primer error si el formulario es muy largo
    return;
  }

  isLoading.value = true;
  responseMessage.value = "";
  try {
    const res = await fetch("/api/confirmar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    responseMessage.value = `Formulario enviado con éxito. ${data}`;

    emits("success");
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
  <RsvpStepLayout :image="girldancing" image-alt="Muñecos bailando" novalidate>
    <div class="details-step">
      <h2 class="details-step__title">Maria & Alex</h2>
      <h3 class="details-step__subtitle">30.05.2026</h3>
      <p class="details-step__text">
        {{ t(currentLocale, "rsvp.details.text") }}
      </p>

      <form class="details-step__form" @submit.prevent="handleSubmit">
        <div class="details-step__field-wrapper">
          <label v-if="!form.name" for="name" class="details-step__label">
            {{ t(currentLocale, "rsvp.details.name") }}
          </label>

          <input
            id="name"
            class="details-step__input"
            :class="{ 'has-error': submitted && validationErrors.name }"
            v-model="form.name"
            type="text"
          />

          <span v-if="submitted && validationErrors.name" class="error-text">
            {{ t(currentLocale, "errors.required") }}
          </span>
        </div>

        <div class="details-step__field-wrapper">
          <label
            v-if="!form.lastname"
            for="lastname"
            class="details-step__label"
          >
            {{ t(currentLocale, "rsvp.details.lastname") }}
          </label>
          <input
            id="lastname"
            class="details-step__input"
            :class="{ 'has-error': submitted && validationErrors.lastname }"
            v-model="form.lastname"
            type="text"
          />
          <span
            v-if="submitted && validationErrors.lastname"
            class="error-text"
          >
            {{ t(currentLocale, "errors.required") }}
          </span>
        </div>

        <div
          class="details-step__group"
          :class="{
            'has-error-group': submitted && validationErrors.attending,
          }"
        >
          <p class="details-step__question">
            {{ t(currentLocale, "rsvp.details.question.attending") }}
          </p>
          <div class="details-step__radio-options">
            <label class="details-step__radio-label">
              <input type="radio" value="yes" v-model="form.attending" />
              <span>{{ t(currentLocale, "rsvp.details.answer.oc") }}</span>
            </label>
            <label class="details-step__radio-label">
              <input type="radio" value="no" v-model="form.attending" />
              <span>{{ t(currentLocale, "rsvp.details.answer.not") }}</span>
            </label>
          </div>
          <span
            v-if="submitted && validationErrors.attending"
            class="error-text"
          >
            {{ t(currentLocale, "errors.required") || "Selecciona una opción" }}
          </span>
        </div>

        <div v-if="form.attending === 'yes'" class="details-step__conditional">
          <div
            class="details-step__group"
            :class="{ 'has-error-group': submitted && validationErrors.bus }"
          >
            <p class="details-step__question">
              {{ t(currentLocale, "rsvp.details.question.bus") }}
            </p>
            <div class="details-step__radio-options--bus">
              <label class="details-step__radio-label">
                <input type="radio" value="yes" v-model="form.bus" />
                <span>{{ t(currentLocale, "rsvp.details.answer.yes") }}</span>
              </label>
              <label class="details-step__radio-label">
                <input type="radio" value="no" v-model="form.bus" />
                <span>{{ t(currentLocale, "rsvp.details.answer.no") }}</span>
              </label>
              <label class="details-step__radio-label">
                <input type="radio" value="only_going" v-model="form.bus" />
                <span>{{
                  t(currentLocale, "rsvp.details.answer.onlyGoing")
                }}</span>
              </label>
              <label class="details-step__radio-label">
                <input type="radio" value="only_returning" v-model="form.bus" />
                <span>{{
                  t(currentLocale, "rsvp.details.answer.onlyReturning")
                }}</span>
              </label>
            </div>
            <span v-if="submitted && validationErrors.bus" class="error-text">
              {{
                t(currentLocale, "errors.required") || "Selecciona una opción"
              }}
            </span>
          </div>

          <div
            class="details-step__group"
            :class="{
              'has-error-group': submitted && validationErrors.partnerJoining,
            }"
          >
            <p class="details-step__question">
              {{ t(currentLocale, "rsvp.details.question.partner") }}
            </p>
            <div class="details-step__radio-options">
              <label class="details-step__radio-label">
                <input type="radio" value="yes" v-model="form.partnerJoining" />
                <span>{{ t(currentLocale, "rsvp.details.answer.yes") }}</span>
              </label>
              <label class="details-step__radio-label">
                <input type="radio" value="no" v-model="form.partnerJoining" />
                <span>{{ t(currentLocale, "rsvp.details.answer.no") }}</span>
              </label>
            </div>
            <span
              v-if="submitted && validationErrors.partnerJoining"
              class="error-text"
            >
              {{
                t(currentLocale, "errors.required") || "Selecciona una opción"
              }}
            </span>
          </div>

          <div
            v-if="form.partnerJoining === 'yes'"
            class="details-step__field-wrapper details-step__subgroup"
          >
            <label
              v-if="!form.partnerName"
              for="partnerName"
              class="details-step__label"
            >
              {{ t(currentLocale, "rsvp.details.partnerName") }}
            </label>

            <input
              id="partnerName"
              class="details-step__input"
              :class="{
                'has-error': submitted && validationErrors.partnerName,
              }"
              v-model="form.partnerName"
              type="text"
            />

            <span
              v-if="submitted && validationErrors.partnerName"
              class="error-text"
            >
              {{ t(currentLocale, "errors.required") }}
            </span>
          </div>
        </div>

        <div class="details-step__field-wrapper">
          <label
            v-if="!form.allergies"
            for="allergies"
            class="details-step__label"
          >
            {{ t(currentLocale, "rsvp.details.question.diet") }}
          </label>

          <input
            id="allergies"
            class="details-step__input"
            v-model="form.allergies"
            type="text"
          />
        </div>

        <div class="details-step__field-wrapper">
          <label
            v-if="!form.comments"
            for="comments"
            class="details-step__label"
          >
            {{ t(currentLocale, "rsvp.details.question.comment") }}
          </label>

          <textarea
            id="comments"
            class="details-step__input"
            v-model="form.comments"
          ></textarea>
        </div>

        <div class="details-step__buttons">
          <a class="details-step__back-button" href="/">{{
            t(currentLocale, "rsvp.buttonBack")
          }}</a>
          <button class="details-step__button" type="submit">
            {{ t(currentLocale, "rsvp.buttonLabel") }}
          </button>
        </div>
      </form>
      <Loader v-if="isLoading" />
      <ModalError
        v-if="isErrorModalVisible"
        @close="isErrorModalVisible = false"
      />
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

  // Wrapper para poder posicionar el mensaje de error relativo al input
  &__field-wrapper {
    width: 100%;
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  &__label {
    position: absolute;
    left: 10px;
    top: 10px;
    pointer-events: none;
    color: #999;
    font-family: $font-cormorant;
    font-size: $font-size-md;
    transition: opacity 0.2s;
  }

  &__input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    font-family: $font-cormorant;
    border: 1px solid $color-text;
    background-color: transparent;
    border-radius: 4px;
    // Quitamos margin-bottom de aquí porque lo controla el wrapper ahora
    margin-bottom: 0;
    outline: none;
    transition: all 0.2s;
    font-size: $font-size-md;

    // Clase de error
    &.has-error {
      border-color: $color-red;
      background-color: rgba($color-red, 0.05);
      color: $color-red;
    }
  }

  // Mensaje de error
  .error-text {
    color: $color-red;
    font-size: $font-size-base;
    font-family: $font-serif;
    margin-top: 0.25rem;
    text-align: left;
    width: 100%;
    animation: fadeIn 0.3s ease;
  }

  &__group {
    margin-bottom: 1.5rem;
    width: 100%;
    text-align: left;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid transparent; // Para que no salte al añadir borde rojo

    &.has-error-group {
      border: 1px solid rgba($color-red, 0.3);
      background-color: rgba($color-red, 0.02);

      .details-step__question {
        color: $color-red;
      }
    }
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
    margin-bottom: 1rem;
    display: block;
    font-size: $font-size-md;
  }

  &__radio-options {
    display: flex;
    gap: 2rem;
    justify-content: flex-start;

    &--bus {
      display: flex;
      gap: 1.5rem;
      flex-direction: column;
    }
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
div > label > input[type="radio"] {
  margin-right: 0.4rem;
  accent-color: $color-text;
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
