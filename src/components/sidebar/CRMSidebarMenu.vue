<script lang="ts" setup>
import { MenuData } from "~/components/sidebar/CRMSidebarMenuData";
</script>

<template>
  <div>
    <NuxtLink
        v-for="item in MenuData" :key="item.name" :to="item.url"
        class="flex items-center px-3 py-1 rounded-lg w-full mb-4 transition-all hover:bg-card hover:shadow">
      <Icon :name="item.icon" class="mr-3"/>
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>