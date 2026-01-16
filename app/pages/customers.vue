<script setup lang="ts">
import type {
  ICustomer
} from '@/types'

definePageMeta({
  title: 'pages.customers.title'
})

const {
  data,
  page,
  state,
  error,
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

      :total="data?.total || 0"
      :pending="pending"
    />

    <AppTable
      :error="error"
      :items="data?.items"
      :pending="pending"
      :columns="columns.customers"

      :sort-by="state.sortBy"
      :sort-order="state.sortOrder"

      @sort="toggleSort"
    />
  </div>
</template>