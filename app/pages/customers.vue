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
  toggleSort,
  toggleFilter
} = useTable<ICustomer>('/api/customers')
</script>

<template>
  <div :class="['customersPage']">
    <AppToolbar
      v-model:limit="state.limit"
      v-model:search="search"
      v-model:page="page"

      :state="state"

      :total="total"
      :pending="pending"
    />

    <AppTable
      :error="error"
      :items="items"
      :pending="pending"
      :columns="columns.customers"

      :filters="state.filters"
      :sort-by="state.sortBy"
      :sort-order="state.sortOrder"

      @sort="toggleSort"
      @filter="toggleFilter"
    />
  </div>
</template>