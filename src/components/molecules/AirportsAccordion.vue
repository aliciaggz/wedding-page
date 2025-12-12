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
        <iframe :src="accordion.map" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
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
    open: false,
    map: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d401617.00670595607!2d-1.1911005189002453!3d38.148729003339135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xd624ac64d10da33%3A0xdcb245de25b9bef1!2sAeropuerto%20de%20Alicante%20-Elche%20Miguel%20Hern%C3%A1ndez%2C%20Calle%20de%20lAltet%2C%20Elche!3m2!1d38.284924!2d-0.5622132!4m5!1s0xd6381f8d5928c7f%3A0xd627129b38c4ab9a!2sMurcia!3m2!1d37.9893044!2d-1.1320073!5e0!3m2!1ses!2ses!4v1765558606619!5m2!1ses!2sess"

  },
  {
    question: "Murcia aiport",
    getThere: "About 30 mins from the city by car, or an hour by public transport.",
    transportText1: "The airport bus takes 30 minutes to get to the city centre. It works in relation to the flight here y here.",
    transportText2: "If taking public transport from RMU, there is a short walk from the airport to the bus stop “La Torrica”. Catch BUS 72 which will take you to the city, it will end at “Glorieta de España Par” in the city centre.",
    transportText3: "From here you can transfer to another bus or taxi to get to your accommodation.",
    airportAcron: "RMU Airport",
    open: false,
    map: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d100747.44707944164!2d-1.2164541451512787!3d37.89870057905449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xd637b5255ce6249%3A0x69b0f7690d3417fd!2sAeropuerto%20Internacional%20Regi%C3%B3n%20de%20Murcia%20(RMU)%2C%20Av.%20de%20Espa%C3%B1a%2C%20Valladolises%20y%20Lo%20Jurado!3m2!1d37.804476799999996!2d-1.1313311!4m5!1s0xd6381f8d5928c7f%3A0xd627129b38c4ab9a!2sMurcia!3m2!1d37.9893044!2d-1.1320073!5e0!3m2!1ses!2ses!4v1765558461218!5m2!1ses!2ses"
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
  text-align: center;
  background: transparent;
  margin-top: 0.5rem;
  border-radius: 12px;
  font-size: $font-size-sm;
}
</style>
