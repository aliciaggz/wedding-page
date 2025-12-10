<template>
  <div class="airport-accordion">
    <div class="accordion-item" v-for="(accordion, i) in accordions" :key="i">
      <button class="accordion-question" @click="toggle(i)">
        {{ accordion.question }}
        <span class="arrow" :class="{ open: accordion.open }">⌄</span>
      </button>
      <div class="accordion-answer" v-show="accordion.open">
        <h4 class="title-cormorant-h2">{{ accordion.question }}</h4>
        <h5 class="subtitle-dancing-h3">How do I get there?</h5>
        <p>{{ accordion.getThere }}</p>
        <p>Click to vien on Google Maps</p>
        <h5 class="subtitle-dancing-h3">public transport</h5>
        <p>{{ accordion.transportText1 }}</p>
        <p>{{ accordion.transportText2 }}</p>
        <p>{{ accordion.transportText3 }}</p>

        <h5 class="subtitle-dancing-h3">car rental</h5>
        <p>These are some car rental companies that are available from or nearby {{ accordion.airportAcron }}:</p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const accordions = reactive([
  {
    question: "Alicante airport",
    getThere: "Just shy of an hour away from the city by either car or public transport.",
    airportAcron: "ALC Airport",
    transportText1: "If taking public transport from ALC, there is a shuttle Bus that can take you to Murcia Bus Station in the city.",
    transportText2: "It uses a company called ALSA and can be taken from the airport direct to Murcia. This bus runs every 2 hours.",
    open: false
  },
  {
    question: "Murcia aiport",
    getThere: "About 30 mins from the city by car, or an hour by public transport.",
    transportText1: "The airport bus takes 30 minutes to get to the city centre. It works in relation to the flight here y here.",
    transportText2: "If taking public transport from RMU, there is a short walk from the airport to the bus stop “La Torrica”. Catch BUS 72 which will take you to the city, it will end at “Glorieta de España Par” in the city centre.",
    transportText3: "From here you can transfer to another bus or taxi to get to your accommodation.",
    airportAcron: "RMU Airport",
    open: false
  },
])

function toggle(index) {
  accordions[index].open = !accordions[index].open
}
</script>

<style lang="scss" scoped>
.airport-accordion {
  padding: 2rem;
  width: 100%;
  margin-inline: 1.5rem;
}

.accordion-title {
  text-transform: none;
}

.accordion-item {
  margin-bottom: 1rem;
  font-family: $font-cormorant;
}

.accordion-question {
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

.accordion-question .arrow {
  transition: transform 0.3s ease;
}

.accordion-question .arrow.open {
  transform: rotate(180deg);
}

.accordion-answer {
  background: transparent;
  margin-top: 0.5rem;
  border-radius: 12px;
  font-size: $font-size-sm;
  color: #333;
  text-align: left;

}
</style>
