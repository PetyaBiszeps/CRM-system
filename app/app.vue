<script setup lang="ts">
const loader = useLoader()
const {
  isLoading
} = useLoadingIndicator()
</script>

<template>
  <div>
    <Transition name="fade">
      <AppLoader
        v-if="loader || isLoading"
        :overlay="true"
        :center="true"
        :filled="true"
        :size="400"
      />
    </Transition>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>