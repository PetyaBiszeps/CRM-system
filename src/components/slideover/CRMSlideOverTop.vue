<script lang="ts" setup>
import { generateStatusStyle } from "~/components/slideover/CRMSlideOverStatusStyle";
import CRMSlideOverLabel from "~/components/slideover/CRMSlideOverLabel.vue";
import { useDealDetailsStore } from '~/stores/dealDetailsStore';
import dayjs from 'dayjs';

const store = useDealDetailsStore();

const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => {
    store.isOpen = value;
  }
});
</script>

<template>
  <div class="border border-border rounded p-3">
    <div class="flex justify-between uppercase bold text-xl mb-4">
      <h1>About Deal</h1>
      <Icon class="cursor-pointer hover:text-primary transition-all" name="radix-icons:cross-1" size="24" @click="isLocalOpen = !isLocalOpen"/>
    </div>
    <CRMSlideOverLabel label-text="Name">
      <h2>{{ store.card?.name }}</h2>
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Price">
      {{ convertCurrency(store.card?.price || 0) }}
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Status">
      <UiBadge :style="generateStatusStyle(store.card?.status)" variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Client">
      {{ store.card?.companyName }}
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Creation Date">
      {{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}
    </CRMSlideOverLabel>
  </div>
</template>

<style scoped>

</style>