<script lang="ts" setup>
import type { IDeal } from "~/types/deals";

import { useCreateComment } from "~/components/slideover/CRMCommentCreate";
import { useComments } from "~/components/slideover/CRMComments";
import dayjs from "dayjs";

const { data, refetch, isLoading } = useComments();
const { commentRef, writeComment } = useCreateComment({ refetch });

const card = data as unknown as IDeal;
</script>

<template>
  <UiSkeleton v-if="isLoading" class="w-full h-[76px] rounded mt-5"/>
  <div v-else-if="card">
    <div v-for="comment in card?.comments" :key="comment.$id" class="flex items-start mb-4">
      <Icon class="mr-3 mt-1" name="radix-icons:chat-bubble" size="25"/>
      <div class="bg-card border border-border rounded p-3 w-full text-card-foreground">
        <div class="mb-2 text-sm">
          Comment {{ dayjs(comment.$createdAt).format('HH:mm') }}
        </div>
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
  <div class="relative">
    <UiInput v-model="commentRef" class="pr-9" placeholder="Write a comment" @keyup.enter="writeComment"/>
    <Icon class="absolute top-2 right-1.5 hover:text-primary cursor-pointer" name="radix-icons:paper-plane" size="22" @click="writeComment"/>
  </div>
</template>

<style scoped>

</style>