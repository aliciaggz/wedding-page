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
    question: "Where can I confirm my attendance?",
    answer: "All RSVPs are done online (scroll up a bit and click the big RSVP button), but if you have trouble with the form, please contact Alex or Maria.",
    open: false
  },
  {
    question: "What date should I RSVP by?",
    answer: "Please RSVP by April 9th, 2026.",
    open: false
  },
  {
    question: "What is the weather like in the area?",
    answer: "The weather during the month of May is usually beautiful! Depending on if summer stays around it may be in the low to mid 70s, but then cool off nicely at night (50s-60s). The average temp is around 65 and sunny. We don't expect rain, but we'll always be prepared!",
    open: false
  },
  {
    question: "Can children come?",
    answer: "We love your little ones, but our wedding will be for adults and teenagers only. We kindly ask that young children not attend, partly due to venue rules and partly so that everyone can eat, drink, and dance without worrying about nap times.",
    open: false
  },
  {
    question: "Dress Code & Outfit Tips",
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
  width: 85%;
  // max-width: 600px;
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
  font-size: $font-size-base;
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
  font-size: $font-size-base;
  color: #333;
  text-align: left;


}
</style>
