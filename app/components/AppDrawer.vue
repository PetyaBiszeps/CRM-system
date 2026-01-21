<script setup lang="ts">
const {
  closeDrawer
} = useStates()
</script>

<template>
  <div :class="['drawerWrapper']">
    <div class="overlay" />

    <aside v-click-outside="closeDrawer">
      Some text here
    </aside>
  </div>
</template>