<template>
  <div class="timeline">
    <div class="timeline-line"></div>
    <div class="timeline-item" v-for="(event, i) in events" :key="i" :class="i % 2 === 0 ? 'left' : 'right'">
      <div class="content">
        <span class="time">{{ event.time }}</span>
        <h3 class="title">{{ event.title }}</h3>
        <p class="text">{{ event.text }}</p>
      </div>
      <img v-if="event.icon" class="icon" :src="event.icon" alt="" />
      <div class="dot"></div>
    </div>
  </div>
</template>

<script setup>
const events = [
  {
    time: "30TH MAY 2025",
    title: "CEREMONY",
    text: "",
    icon: ""
  },
  {
    time: "13:30",
    title: "ARRIVAL",
    text: "Parque de la Marquesa, Carretera B-10, Km 4.3, 30612 Ulea, Murcia",
    icon: "/src/assets/car.svg"
  },
  {
    time: "14:00",
    title: "START OF THE CEREMONY",
    text: "Guests may arrive at 1:30 p.m. and the ceremony will begin at 3:00 p.m.",
    icon: "/src/assets/rings.svg"
  },
  {
    time: "15:00",
    title: "FOOD",
    text: "Enjoy drinks, canapés, conversation and dreamy melodies under the oak tree.",
    icon: "/src/assets/cheese.svg"
  },
  {
    time: "18:00",
    title: "PARTY",
    text: "We danced, toasted and celebrated.",
    icon: "/src/assets/mirrorball.svg"
  },
  {
    time: "00:00",
    title: "END OF THE CEREMONY",
    text: "Thank you all for coming and sharing this special moment with us.",
    icon: ""
  },
];
</script>
<style lang="scss">
.timeline {
  position: relative;
  width: 100%;
  // padding: 4rem 0;
  display: grid;
  gap: 3rem;
  margin-top: 2.5rem;
  margin-bottom: 4rem;
}

/* Línea vertical */
.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background-color: $color-red;
}

/* Cada evento */
.timeline-item {
  position: relative;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;

  /* Mantiene alineación a los lados */
  &.left {
    .content {
      grid-column: 1;
      text-align: right;
      margin-right: 1rem;

    }

    .icon {
      grid-column: 2;
    }
  }

  &.right {
    .content {
      grid-column: 2;
      text-align: left;
      margin-left: 1rem;
    }

    .icon {
      grid-row: 1;
    }
  }
}

/* Dots */
.dot {
  position: absolute;
  left: 50%;
  top: 0;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: $color-red;
  box-shadow: 0 0 0 3px $color-red;
  transform: translate(-50%, -50%);
}

/* Iconos */
.icon {
  min-width: 5rem;
  height: auto;
  justify-self: center;
  object-fit: contain;
}

/* Tipografía */
.time {
  font-size: $font-size-sm;
  color: $color-text;
  font-weight: lighter;
  font-family: $font-lato;

}

.title {
  font-family: $font-lato;
  font-weight: lighter;
  color: $color-text;
  font-size: $font-size-base;
  margin: 0.4rem 0;
}

.text {
  font-family: $font-cormorant;
  color: $color-text;
  font-size: $font-size-base;
  max-width: 260px;
  margin: auto;
}
</style>