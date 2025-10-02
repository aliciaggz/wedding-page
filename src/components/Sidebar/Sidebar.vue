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
  background: red;
  color: white;
  transition: left 0.3s ease;
  padding: 2rem;

  &__menu {
    display: flex;
  }

  &.open {
    left: 0;
  }

  nav ul {
    list-style: none;
    padding: 0;

    li {
      margin: 1rem 0;

      a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
