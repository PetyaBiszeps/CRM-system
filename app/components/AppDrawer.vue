<script setup lang="ts">
const {
  closeDrawer
} = useStates()
</script>

<template>
  <div :class="['drawerWrapper']">
    <div class="overlay" />

    <transition
      name="slide-left"
      appear
    >
      <aside v-click-outside="closeDrawer">
        Some text here
      </aside>
    </transition>
  </div>
</template>