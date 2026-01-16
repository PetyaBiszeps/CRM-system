<script setup lang="ts">
import type {
  ICustomer
} from '@/types'

definePageMeta({
  title: 'pages.customers.title'
})

const {
  page,
  items,
  state,
  error,
  total,
  search,
  pending,
  toggleSort
} = useTable<ICustomer>('/api/customers')
</script>

<template>
  <div :class="['customersPage']">
    <AppToolbar
      v-model:search="search"
      v-model:page="page"

      :state="state"
      :limit="state.limit"

      :total="total"
      :pending="pending"
    />

    <AppTable
      :error="error"
      :items="items"
      :pending="pending"
      :columns="columns.customers"

      :sort-by="state.sortBy"
      :sort-order="state.sortOrder"

      @sort="toggleSort"
    />
  </div>
</template>