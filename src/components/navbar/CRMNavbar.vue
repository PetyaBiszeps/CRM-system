<script lang="ts" setup>
import CRMNavbarMenu from "~/components/navbar/CRMNavbarMenu.vue";
import { useAuthStore, useIsLoadingStore } from "~/stores/authStore";

const isOpenNav = ref(false);
</script>

<template>
  <nav class="w-full bg-background border-2 border-border rounded-lg sticky top-0 left-0 z-50">
    <div class="p-2 flex justify-between">
      <h1 class="text-2xl font-bold">CRM System</h1>
      <button class="flex items-center" @click="isOpenNav = !isOpenNav">
        <Icon v-if="isOpenNav" name="radix-icons:cross-1" size="26"/>
        <Icon v-else name="radix-icons:hamburger-menu" size="26"/>
      </button>
    </div>
    <CRMNavbarMenu v-if="isOpenNav" class="navbar-menu"/>
  </nav>
</template>

<style scoped>
.navbar-menu {
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
}
</style>