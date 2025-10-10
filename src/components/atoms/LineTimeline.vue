<template>
  <div class="timeline">
    <div class="line"></div>

    <div class="dot" style="top: 50px;"></div>
    <div class="dot" style="top: 200px;"></div>
    <div class="dot" style="top: 350px;"></div>
    <div class="dot" style="top: 500px;"></div>
  </div>
</template>
<style lang="scss" scoped>

.timeline {
  position: relative;
  width: 100%;
  height: 100vh; /* ajusta según lo largo que necesites */
}

.line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: $color-accent;
  transform: translateX(-50%);
}

.dot {
  position: absolute;
  left: 50%;
  width: 0.2rem;
  height: 0.2rem;
  background-color: $color-accent;
  border-radius: 50%;
  transform: translate(-50%, 0);
  box-shadow: 0 0 0 2px $color-accent;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.dot:hover {
  transform: translate(-50%, -2px) scale(1.2);
  background-color: #ff5c9d;
}

</style>
