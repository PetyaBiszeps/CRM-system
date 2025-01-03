<script lang="ts" setup>
import type { EnumStatus } from "~/types/deals";
import type { ICard, IColumn } from "~/components/board/CRMBoardTypes";

import CRMBoardCreateDeal from "~/components/board/CRMBoardCreateDeal.vue";
import { generateColumnStyle } from "~/components/board/CRMBoardGradient";
import CRMSlideOver from "~/components/slideover/CRMSlideOver.vue";
import { useBoardQuery } from "~/components/board/CRMBoardQuery";
import { useDealDetailsStore } from "~/stores/dealDetailsStore";
import { DB_ID, COLLECTION_DEALS } from "~/constants";
import { useMutation } from "@tanstack/vue-query";
import dayjs from "dayjs";

useSeoMeta({
  title: 'Home | CRM System'
});

const store = useDealDetailsStore();
const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useBoardQuery();

// Card movement
type mutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate } = useMutation(({
  mutationKey: ['move card'],
  mutationFn: ({ docId, status }: mutationVariables) =>
      DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, { status }),
  onSuccess: () => {
    refetch();
  },
}));

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
  }
}
</script>

<template>
  <div class="p-2 sm:p-10">
    <h1 class="mb-10 text-2xl font-bold hidden sm:block">CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-16 gap-y-8 sm:gap-16">
        <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver" @drop="() => handleDrop(column)">
          <div :style="generateColumnStyle(index)" class="border-2 border-border rounded bg-card sm:px-5 py-1 mb-2 text-center">
            {{ column.name }}
          </div>
          <div>
            <CRMBoardCreateDeal :refetch="refetch" :status="column.id"/>
            <UiCard v-for="card in column.items" :key="card.id" class="mb-3 cursor-pointer" draggable="true" @click="store.set(card)"
                    @dragstart="() => handleDragStart(card, column)">
              <UiCardHeader role="button">
                <UiCardTitle>{{ card.name }}</UiCardTitle>
                <UiCardDescription>{{ convertCurrency(card.price) }}</UiCardDescription>
              </UiCardHeader>
              <UiCardContent>Customer: {{ card.companyName }}</UiCardContent>
              <UiCardFooter>Received: {{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</UiCardFooter>
            </UiCard>
          </div>
        </div>
      </div>

      <CRMSlideOver/>
    </div>
  </div>
</template>

<style scoped>

</style>