<script setup lang="ts">
const i18n = useI18n()
const route = useRoute()
</script>

<template>
  <div class="wrapper">
    <AppSidebar />

    <div class="content">
      <p
        v-if="route.meta.title"
        class="breadcrumb"
      >
        CRM / {{ i18n.t(String(route.meta.title)) }}
      </p>

      <slot />

      <AppDock />
    </div>
  </div>
</template>