<script lang="ts" setup>
import CRMSidebar from "~/components/sidebar/CRMSidebar.vue";
import { useAuthStore, useIsLoadingStore } from "~/stores/authStore";

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
    <CRMSidebar v-if="authStore.isAuth"/>
    <div>
      <slot/>
    </div>
  </section>
</template>

<style scoped>
.layoutGrid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>