<script lang="ts" setup>
import CRMNavbarMenu from "~/components/navbar/CRMNavbarMenu.vue";
import { useAuthStore, useIsLoadingStore } from "~/stores/authStore";

const isOpenNav = ref(false);
const closeDelay = () => {
  setTimeout(() => {
    isOpenNav.value = false;
  }, 20);
};

const router = useRouter();
const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();

const logout = async () => {
  isLoadingStore.set(true);

  await account.deleteSession('current');
  authStore.clear();

  await router.push('/login');

  isLoadingStore.set(false);
};
</script>

<template>
  <nav class="w-full bg-background border-2 border-border rounded-lg sticky top-0 left-0 z-50">
    <div class="relative">
      <div class="p-2 flex justify-between">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold hover:text-primary transition-all">CRM System</h1>
        </NuxtLink>
        <button class="flex items-center hover:text-primary transition-all" @click="isOpenNav = !isOpenNav">
          <Icon v-if="isOpenNav" name="radix-icons:cross-1" size="26"/>
          <Icon v-else name="radix-icons:hamburger-menu" size="26"/>
        </button>
      </div>
      <button v-if="isOpenNav" class="navbar-menu absolute bottom-0 right-2 transition-colors hover:text-primary" @click="logout">
        <Icon name="line-md:logout" size="24"/>
      </button>
      <CRMNavbarMenu v-if="isOpenNav" class="navbar-menu" @click="closeDelay"/>
    </div>
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