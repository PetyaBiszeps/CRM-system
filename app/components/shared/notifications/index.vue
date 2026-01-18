<script setup lang="ts">
const model = defineModel<boolean>({
  required: true
})

// const { user } = useUserSession()
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