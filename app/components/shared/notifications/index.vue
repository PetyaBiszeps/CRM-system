<script setup lang="ts">
const model = defineModel<boolean>({
  required: true
})
</script>

<template>
  <transition name="curtain-center">
    <div
      v-if="model"
      :class="['notifications']"
    >
      <h2>Notifications</h2>
    </div>
  </transition>
</template>