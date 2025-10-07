<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <nav class="sidebar__menu">
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/historia">Nuestra Historia</a></li>
        <li><a href="/guia">Guía de Viaje</a></li>
        <li><a href="/rsvp">RSVP</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: Boolean
})
</script>

<style scoped lang="scss">

.sidebar {
  position: fixed;
  top: 0;
  left: 500px;
  width: 100%;
  height: 100vh;
  background: $color-accent;
  color: white;
  transition: left 0.3s ease;
  padding: 2rem;
  z-index: 1000;


  &__menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &.open {
    left: 0;
  }

  nav ul {
    list-style: none;
    padding: 0;

    li {
      margin: 2rem 0;

      a {
        color: $color-white;
        text-decoration: none;
        font-family: $font-serif;
        font-weight: 300;
        font-size: $font-size-lg;
      }
    }
  }
}
</style>
