<script setup lang="ts">
defineProps<{
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <div
    :class="['skeletonWrapper']"
    :style="[{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: '8px',
    }]"
  />
</template>