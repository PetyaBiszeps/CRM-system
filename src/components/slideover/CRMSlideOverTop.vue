<script lang="ts" setup>
import { useRemoveTask } from "~/components/slideover/interactions/CRMSlideOverTaskRemove";
import { useEditTask } from "~/components/slideover/interactions/CRMSlideOverTaskEdit";
import { generateStatusStyle } from "~/components/slideover/CRMSlideOverStatusStyle";
import CRMSlideOverLabel from "~/components/slideover/CRMSlideOverLabel.vue";
import dayjs from 'dayjs';

const { store, isLocalOpen, isPending, removeTask } = useRemoveTask();
const { isEditActive, editableFields, isUpdating, toggleEditMode } = useEditTask();
</script>

<template>
  <div class="border border-border rounded p-3">
    <div class="flex justify-between uppercase bold text-xl mb-4">
      <h1>About Deal</h1>
      <Icon class="cursor-pointer hover:text-primary transition-all" name="radix-icons:cross-1" size="24" @click="isLocalOpen = !isLocalOpen"/>
    </div>
    <CRMSlideOverLabel label-text="Name">
      <template v-if="isEditActive">
        <UiInput v-model="editableFields.name"/>
      </template>

      <template v-else>
        <h2>{{ store.card?.name }}</h2>
      </template>
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Price">
      <template v-if="isEditActive">
        <UiInput v-model="editableFields.price" type="number"/>
      </template>

      <template v-else>
        <h2>{{ convertCurrency(store.card?.price || 0) }}</h2>
      </template>
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Status">
      <UiBadge :style="generateStatusStyle(store.card?.status)" variant="outline">
        {{ store.card?.status }}
      </UiBadge>
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Client">
      <h2>{{ store.card?.companyName }}</h2>
    </CRMSlideOverLabel>

    <CRMSlideOverLabel label-text="Creation Date">
      <h2>{{ dayjs(store.card?.$createdAt).format('DD MMMM YYYY') }}</h2>
    </CRMSlideOverLabel>
  </div>
  <div class="flex gap-4 sm:gap-8 mt-5">
    <UiButton :disabled="isUpdating" class="border border-max-w-full bg-card text-card-foreground hover:bg-edit" @click="toggleEditMode">
      {{ isEditActive ? (isUpdating ? "Saving..." : "Save") : "Edit" }}
    </UiButton>

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
          <UiAlertDialogAction :disabled="isPending" class="bg-card border border-border hover:bg-delete" @click="removeTask">Continue</UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>

<style scoped>

</style>