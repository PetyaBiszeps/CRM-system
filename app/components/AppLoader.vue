<script setup lang="ts">
const {
  size = 48,
  filled = false,
  center = false,
  overlay = false
} = defineProps<{
  size?: number
  filled?: boolean
  center?: boolean
  overlay?: boolean
}>()
</script>

<template>
  <div
    :class="['loaderWrapper', {
      filled: filled,
      center: center,
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