<script setup lang="ts">
const i18n = useI18n()
const route = useRoute()
const {
  isDrawer
} = useStates()
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

    <AppDrawer v-if="isDrawer" />
  </div>
</template>