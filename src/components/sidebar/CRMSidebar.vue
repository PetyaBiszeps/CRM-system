<script lang="ts" setup>
import CRMSidebarMenu from "~/components/sidebar/CRMSidebarMenu.vue";
import { useAuthStore, useIsLoadingStore } from "~/stores/authStore";

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
  <aside class="w-full h-full relative shadow-xl py-8 px-5">
    <NuxtLink class="mb-10 block" to="/">
      <NuxtImg alt="logo" class="w-32 mx-auto" src="/logo.svg"/>
    </NuxtLink>
    <button class="items-center absolute top-2 right-3 transition-colors hover:text-primary" @click="logout">
      <Icon name="line-md:logout" size="24"/>
    </button>
    <CRMSidebarMenu/>
  </aside>
</template>

<style scoped>

</style>