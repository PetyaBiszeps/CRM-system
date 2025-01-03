<script lang="ts" setup>
import { generateStatusStyle } from "~/components/slideover/CRMSlideOverStatusStyle";
import CRMSlideOverLabel from "~/components/slideover/CRMSlideOverLabel.vue";
import { useBoardQuery } from "~/components/board/CRMBoardQuery";
import { useDealDetailsStore } from '~/stores/dealDetailsStore';
import { DB_ID, COLLECTION_DEALS } from "~/constants";
import { useMutation } from "@tanstack/vue-query";
import dayjs from 'dayjs';

const { refetch } = useBoardQuery();
const store = useDealDetailsStore();
const isLocalOpen = computed({
  get: () => store.isOpen,
  set: value => {
    store.isOpen = value;
  }
});

const { mutate, isPending } = useMutation(({
  mutationKey: ['delete card'],
  mutationFn: () => DB.deleteDocument(DB_ID, COLLECTION_DEALS, store.card!.id),
  onSuccess: () => {
    refetch();
  }
}));

const removeTask = () => {
  isLocalOpen.value = false;
  mutate();
};
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
  <div class="flex gap-4 sm:gap-8 mt-5">
    <UiAlertDialog>
      <UiAlertDialogTrigger class="w-full">
        <UiButton class="border border-max-w-full bg-card text-card-foreground hover:bg-edit">Edit</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
          <UiAlertDialogAction>Continue</UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>

    <UiAlertDialog>
      <UiAlertDialogTrigger class="w-full">
        <UiButton class="border border-max-w-full bg-card text-card-foreground hover:bg-delete">Delete</UiButton>
      </UiAlertDialogTrigger>
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Are you absolutely sure?</UiAlertDialogTitle>
          <UiAlertDialogDescription>
            This action cannot be undone. This will permanently delete this task and remove it from our servers.
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
          <UiAlertDialogAction :disabled="isPending" class="bg-card hover:bg-delete" @click="removeTask">Continue</UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>

<style scoped>

</style>