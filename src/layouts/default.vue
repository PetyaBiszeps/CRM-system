<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from "~/stores/authStore";
import CRMSidebar from "~/components/sidebar/CRMSidebar.vue";
import CRMNavbar from "~/components/navbar/CRMNavbar.vue";

const router = useRouter();
const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();

onMounted(async () => {
  try {
    const user = await account.get();
    if (user) authStore.set(user);
  } catch (error) {
    await router.push('/login');
  } finally {
    isLoadingStore.set(false);
  }
});
</script>

<template>
  <CRMLoader v-if="isLoadingStore.isLoading"/>

  <section v-else :class="{layoutGrid: authStore.isAuth}" class="min-h-screen bg-background">
    <CRMNavbar v-if="authStore.isAuth" class="block sm:hidden"/>
    <CRMSidebar v-if="authStore.isAuth" class="hidden sm:block"/>
    <div class="max-w-full overflow-x-scroll">
      <slot/>
    </div>
  </section>
</template>

<style scoped>
.layoutGrid {
  display: grid;
  grid-template-columns: 1fr minmax(0, 6fr);

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0fr;
  }
}
</style>