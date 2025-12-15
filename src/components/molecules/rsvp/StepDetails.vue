<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import type { FormData } from '@/types/types.ts';
import ModalError from "@/components/molecules/ModalError.vue";

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
const isLoading = ref(false); // Controla la visibilidad de la modal de loading
const isResponseModalVisible = ref(false); // Controla la visibilidad de la modal de confirmación
const responseMessage = ref('');
const showFinalStep = ref(false)

const emits = defineEmits<{
  (e: 'update:modelValue', value: FormData): void;
  (e: 'submit', value: FormData): void;
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

    showFinalStep.value = true;
  } catch (error) {
    console.error(error);
    responseMessage.value = "Hubo un error al enviar el formulario.";
  } finally {
    isLoading.value = false;
    isResponseModalVisible.value = true;
  }
}

</script>

<template>
  <div class="details-step">
  <form  @submit.prevent="handleSubmit">
    <div>
      <label for="name">Nombre:</label>
      <input id="name" v-model="form.name" type="text" required />
    </div>

    <div>
      <label for="lastname">Apellidos:</label>
      <input id="lastname" v-model="form.lastname" type="text" required />
    </div>

    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="form.email" type="email" required />
    </div>

    <div>
      <label>¿Asistirás a la boda?</label>
      <div>
        <label>
          <input type="radio" value="yes" v-model="form.attending" required />
          Sí
        </label>
        <label>
          <input type="radio" value="no" v-model="form.attending" required />
          No
        </label>
      </div>
    </div>

    <div v-if="form.attending === 'yes'">
      <label>¿Asistirás en autobús?</label>
      <div>
        <label>
          <input type="radio" value="yes" v-model="form.bus" required />
          Sí
        </label>
        <label>
          <input type="radio" value="no" v-model="form.bus" required />
          No
        </label>
      </div>

      <div>
        <label>¿Irás acompañado?</label>
        <div>
          <label>
            <input type="radio" value="yes" v-model="form.partnerJoining" required />
            Sí
          </label>
          <label>
            <input type="radio" value="no" v-model="form.partnerJoining" required />
            No
          </label>
        </div>
      </div>

      <div v-if="form.partnerJoining === 'yes'">
        <label for="partnerName">Nombre del acompañante:</label>
        <input id="partnerName" v-model="form.partnerName" type="text" required />
      </div>
    </div>

    <div>
      <label for="allergies">Alergias:</label>
      <input id="allergies" v-model="form.allergies" type="text" />
    </div>

    <div>
      <label for="comments">Comentarios:</label>
      <textarea id="comments" v-model="form.comments"></textarea>
    </div>

    <button type="submit" :disabled="!isFormValid">Enviar</button>
  </form>

  <div v-if="isLoading" class="modal">
    <div class="modal-content">
      <p>Enviando formulario...</p>
    </div>
  </div>

  <!-- Modal de Respuesta -->
  <div v-if="isResponseModalVisible" class="modal">
    <div class="modal-content">
      <p>{{ responseMessage }}</p>
      <button @click="isResponseModalVisible = false">Cerrar</button>
    </div>
  </div>

  <ModalError/>

</div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

// form {
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   padding: 2rem;
//   background: #ffffffcc;
//   backdrop-filter: blur(6px);
//   border-radius: 16px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//   max-width: 480px;
//   margin: auto;
//   font-family: system-ui, sans-serif;
// }

/* Labels */
label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
  display: block;
}

.details-step {
  max-width: 520px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Inputs base */
input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background: #fafafa;
  transition: 0.25s ease;
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
  accent-color: #4f8cff;
}

button:disabled {
  background: #c6d4f5;
  cursor: default;
}

/* Textarea */
textarea {
  min-height: 90px;
  resize: vertical;
}

</style>
