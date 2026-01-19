<script setup lang="ts">
const model = defineModel<boolean>({
  required: true
})

function closeMenu() {
  model.value = false
}
</script>

<template>
  <transition name="curtain-center">
    <div
      v-if="model"
      v-click-outside="closeMenu"
      :class="['notifications']"
    >
      <h2>Notifications</h2>
    </div>
  </transition>
</template>