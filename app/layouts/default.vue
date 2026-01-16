<script setup lang="ts">
const i18n = useI18n()
const route = useRoute()
</script>

<template>
  <div class="wrapper">
    <AppSidebar />

    <div class="content">
      <nav v-if="route.meta.title">
        <p>CRM / {{ i18n.t(String(route.meta.title)) }}</p>
      </nav>

      <slot />

      <AppDock />
    </div>
  </div>
</template>