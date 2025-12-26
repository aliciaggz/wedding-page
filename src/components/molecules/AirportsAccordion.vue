<script setup>
import { ref, computed } from 'vue'
import { locale } from '@/stores/localeStore.js';
import { t } from '@/utils/i18n.js';

const currentLocale = computed(() => locale.value);
const openIndex = ref(null);

const accordions = computed(() => [
  {
    question: t(currentLocale.value, "travel.airports.accordion.alc.title"),
    getThere: t(currentLocale.value, "travel.airports.accordion.alc.getThere"),
    airportAcron: t(currentLocale.value, "travel.airports.accordion.alc.acron"),
    transportText1: t(currentLocale.value, "travel.airports.accordion.alc.transport1"),
    transportText2: t(currentLocale.value, "travel.airports.accordion.alc.transport2"),
    transportText3: "",
    map: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d401617.00670595607!2d-1.1911005189002453!3d38.148729003339135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xd624ac64d10da33%3A0xdcb245de25b9bef1!2sAeropuerto%20de%20Alicante%20-Elche%20Miguel%20Hern%C3%A1ndez%2C%20Calle%20de%20lAltet%2C%20Elche!3m2!1d38.284924!2d-0.5622132!4m5!1s0xd6381f8d5928c7f%3A0xd627129b38c4ab9a!2sMurcia!3m2!1d37.9893044!2d-1.1320073!5e0!3m2!1ses!2ses!4v1765558606619!5m2!1ses!2sess",
  },
  {
    question: t(currentLocale.value, "travel.airports.accordion.rmu.title"),
    getThere: t(currentLocale.value, "travel.airports.accordion.rmu.getThere"),
    airportAcron: t(currentLocale.value, "travel.airports.accordion.rmu.acron"),
    transportText1: t(currentLocale.value, "travel.airports.accordion.rmu.transport1"),
    transportText2: t(currentLocale.value, "travel.airports.accordion.rmu.transport2"),
    transportText3: t(currentLocale.value, "travel.airports.accordion.rmu.transport3"),
    map: "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d100747.44707944164!2d-1.2164541451512787!3d37.89870057905449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xd637b5255ce6249%3A0x69b0f7690d3417fd!2sAeropuerto%20Internacional%20Regi%C3%B3n%20de%20Murcia%20(RMU)%2C%20Av.%20de%20Espa%C3%B1a%2C%20Valladolises%20y%20Lo%20Jurado!3m2!1d37.804476799999996!2d-1.1313311!4m5!1s0xd6381f8d5928c7f%3A0xd627129b38c4ab9a!2sMurcia!3m2!1d37.9893044!2d-1.1320073!5e0!3m2!1ses!2ses!4v1765558461218!5m2!1ses!2ses",
  },
]);

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}

// function toggle(index) {
//   accordions[index].open = !accordions[index].open
// }
</script>
<template>
  <div class="airport-accordion">
    <div class="accordion-item" v-for="(accordion, i) in accordions" :key="i">
      <button class="accordion-question" @click="toggle(i)">
        {{ accordion.question }}
        <span class="arrow" :class="{ open: openIndex === i }">⌄</span>
      </button>
      <div class="accordion-answer" v-show="openIndex === i">
        <h4 class="title-cormorant-h2">{{ accordion.question }}</h4>
        <h5 class="subtitle-dancing-h3">{{ t(currentLocale, "travel.airports.accordion.getThere") }}</h5>
        <p class="accordion__getThere">{{ accordion.getThere }}</p>
        <p class="accordion__google">{{ t(currentLocale, "travel.airports.accordion.clickGoogle") }}</p>
        <iframe class="accordion__iframe" :src="accordion.map" width="600" height="450" allowfullscreen=""
          loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <h5 class="subtitle-dancing-h3">{{ t(currentLocale, "travel.airports.accordion.publicTransport") }}</h5>
        <div class="accordion__text-wrapper">
          <p>{{ accordion.transportText1 }}</p>
          <p>{{ accordion.transportText2 }}</p>
          <p>{{ accordion.transportText3 }}</p>
        </div>

        <h5 class="subtitle-dancing-h3">{{ t(currentLocale, "travel.airports.accordion.carRental") }}</h5>
        <p>{{ t(currentLocale, "travel.airports.accordion.carTxt") }} {{ accordion.airportAcron }}:</p>

        <ul class="accordion__car-rental-list">
          <a
            href="https://www.avis.es/?cid=pp_site-GOOGLE_camp-18320326037_adgroup-140837266523_target-kwd-13402896_creative-773752672007_device-c_feed-&gclsrc=aw.ds&gad_source=1&gad_campaignid=18320326037&gbraid=0AAAAADEVRULrE-0omXpK5iAr94QGqF5zf&gclid=CjwKCAiAmKnKBhBrEiwAaqAnZ4zY8l1lWshpU44dA1sH0Pqkb1HUGwDs3moXUytbHZrfIhsxOUwy7BoCTVYQAvD_BwE">
            <li>Avis</li>
          </a>
          <a href="https://www.goldcar.com/es-es/">
            <li>Goldcar</li>
          </a>
          <a href="https://www.drivalia.es/es/">
            <li>Drivalia</li>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.accordion {
  &__car-rental-list {
    list-style: none;
    display: flex;
    gap: 1rem;
    padding: 0;
    margin: 0;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 4rem;


    & li {
      color: $color-red;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-family: $font-cormorant;
      font-size: $font-size-md;
      text-transform: uppercase;
      text-decoration: underline;
    }
  }

  &__iframe {
    max-width: 52rem;
    width: 100%;
    border: 1rem solid $color-white;
    border-width: 1rem 1rem 1.5rem 1rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
    box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.25);
  }

  &__getThere {
    margin-bottom: 1rem;
  }

  &__text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
}

.airport-accordion {
  padding: 1rem;
  width: 100%;
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
  font-size: $font-size-md;
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
  margin-top: 2rem;
  font-size: $font-size-md;
}
</style>
