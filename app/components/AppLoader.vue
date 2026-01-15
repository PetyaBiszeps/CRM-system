<script setup lang="ts">
const {
  size = 48,
  overlay = false
} = defineProps<{
  size?: number
  overlay?: boolean
}>()
</script>

<template>
  <div
    :class="['loaderWrapper', {
      overlay: overlay,
    }]"
  >
    <NuxtImg
      src="/loader.svg"
      alt="Loading..."

      :style="[{
        width: `${size}px`, height: `${size}px`,
      }]"
    />
  </div>
</template>