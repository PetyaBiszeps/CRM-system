<script setup lang="ts">
const {
  activeCard,
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
        <DrawerHeader :card="activeCard" />
      </aside>
    </transition>
  </div>
</template>