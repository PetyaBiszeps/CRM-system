<script lang="ts" setup>
import { MenuData } from "~/components/navbar/CRMNavbarMenuData";
</script>

<template>
  <div class="mx-1">
    <NuxtLink v-for="item in MenuData" :key="item.name" :to="item.url" class="flex items-center py-1 px-2 rounded-lg w-full mb-2 hover:bg-card hover:shadow">
      <Icon :name="item.icon" class="mr-3"/>
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>