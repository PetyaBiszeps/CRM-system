<script lang="ts" setup>
import CRMSlideOverComments from "~/components/slideover/CRMSlideOverComments.vue";
import CRMSlideOverTop from "~/components/slideover/CRMSlideOverTop.vue";
import { useDealDetailsStore } from "~/stores/dealDetailsStore";

const store = useDealDetailsStore();

const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => {
    store.isOpen = value;
  }
});
</script>

<template>
  <div>
    <LazyUSlideover v-model="isLocalOpen" :ui="{ background: 'bg-transparent dark:bg-transparent'}">
      <UCard
          :ui="{body: {base: 'flex-1'}, base: 'text-popover-foreground', ring: 'border', divide: 'divide-border', background: 'bg-popover dark:bg-popover'}"
          class="flex flex-col flex-1 overflow-y-auto">
        <template #header>
          <CRMSlideOverTop/>
        </template>
        <template #default></template>
        <template #footer>
          <CRMSlideOverComments/>
        </template>
      </UCard>
    </LazyUSlideover>
  </div>
  <!--
  <div>
    <USlideover v-model="isLocalOpen" :ui="{background: 'bg-transparent'}">
      <UCard :ui="{body: {base: 'flex-1'}, ring: '', divide: 'divide-y divide-gray-100'}" class="flex flex-col flex-1 overflow-y-auto">
        <template #header>
          <CRMSlideOverTop/>
          <CRMSlideOverComments/>
        </template>
      </UCard>
    </USlideover>
  </div>
  -->
</template>

<style scoped>

</style>