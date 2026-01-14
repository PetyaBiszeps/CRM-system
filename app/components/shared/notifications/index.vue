<script setup lang="ts">
const model = defineModel<boolean>({
  required: true,
})
</script>

<template>
  <div
    v-if="model"
    :class="['notifications']"
  >
    <h1>Notifications Menu :3</h1>
  </div>
</template>
