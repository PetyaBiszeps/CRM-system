<script lang="ts" setup>
import type { ICustomer } from "~/types/deals";

import { DB_ID, COLLECTION_CUSTOMERS } from "~/constants";
import { useQuery } from "@tanstack/vue-query";

useSeoMeta({
  title: 'Customers | CRM System'
});

const { data: costumers, isLoading } = useQuery({
  queryKey: ['customers'],
  queryFn: () =>
      DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS)
});
</script>

<template>
  <div class="p-2 sm:p-10">
    <h1 class="font-bold text-2xl mb-10">Our Clients</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else class="border-2 border-border rounded-2xl">
      <UiTable class="w-full">
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Image</UiTableHead>
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Email</UiTableHead>
            <UiTableHead>Came from</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="customer in (costumers?.documents as unknown as ICustomer[])" :key="customer.$id">
            <UiTableCell>
              <NuxtLink :href="`/customers/edit/${customer.$id}`">
                <NuxtImg :alt="customer.name" :src="customer.avatar_url" class="rounded-full" width="80"/>
              </NuxtLink>
            </UiTableCell>
            <UiTableCell class="font-medium">{{ customer.name }}</UiTableCell>
            <UiTableCell class="font-medium">{{ customer.email }}</UiTableCell>
            <UiTableCell class="font-medium">{{ customer.from_source }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<style scoped>

</style>