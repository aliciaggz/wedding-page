<template>
  <div class="faq-box">
    <h2 class="faq-title title-cormorant-h2">FAQs</h2>

    <div class="faq-item" v-for="(faq, i) in faqs" :key="i">
      <button class="faq-question" @click="toggle(i)">
        {{ faq.question }}
        <span class="arrow" :class="{ open: faq.open }">⌄</span>
      </button>

      <div class="faq-answer" v-show="faq.open">
        <p>{{ faq.answer }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue'

const faqs = reactive([
  {
    question: "¿Necesito confirmar mi asistencia?",
    answer: "Sí, por favor confirma antes del 1 de mayo.",
    open: false
  },
  {
    question: "¿Hay código de vestimenta?",
    answer: "Ropa elegante pero cómoda. Evita tacones muy finos.",
    open: false
  },
  {
    question: "¿Puedo llevar acompañante?",
    answer: "Solo está permitido si tu invitación lo especifica.",
    open: false
  }
])

function toggle(index) {
  faqs[index].open = !faqs[index].open
}
</script>

<style lang="scss" scoped>
.faq-box {
  background-color: $color-rose;
  padding: 2rem;
  max-width: 600px;
  // margin: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-inline: 1.5rem;
  z-index: 1;
  margin-top: -4.5rem;
}

.faq-title {
  text-transform: none;
}

.faq-item {
  margin-bottom: 1rem;
  font-family: $font-cormorant;
}

.faq-question {
  width: 100%;
  color: $color-text;
  background: transparent;
  border: none;
  border-bottom: 1px solid $color-text;
  outline: none;
  padding-bottom: 1rem;
  padding-top: 0.8rem;
  text-align: left;
  cursor: pointer;
  font-size: $font-size-sm;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: $font-cormorant;

}

.faq-question .arrow {
  transition: transform 0.3s ease;
}

.faq-question .arrow.open {
  transform: rotate(180deg);
}

.faq-answer {
  background: transparent;
  margin-top: 0.5rem;
  border-radius: 12px;
  font-size: $font-size-sm;
  color: #333;
  text-align: left;

}
</style>
