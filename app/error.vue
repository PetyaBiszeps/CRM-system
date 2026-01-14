<script setup lang="ts">
import type {
  NuxtError
} from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <NuxtLayout name="error">
    <NuxtImg
      src="/loader.svg"
      width="200"
    />

    <h1>{{ error.statusCode }}</h1>
    <h3>{{ error.message }}</h3>

    <NuxtLink to="/">Go back home</NuxtLink>
  </NuxtLayout>
</template>