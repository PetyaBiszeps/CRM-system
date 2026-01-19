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
  isFetching,
  toggleFilters,
  toggleClear,
  handleSort,
  handleFilter
} = useTable<ICustomer>('/api/customers')

// const {
//   submit,
//   isPending
// } = useRequest().create<IDBNewCustomer, IDBCustomer>('/api/customers/create')
</script>

<template>
  <div :class="['customersPage']">
    <AppToolbar
      v-model:limit="state.limit"
      v-model:mode="state.mode"
      v-model:search="search"
      v-model:page="page"

      :state="state"

      :total="total"
      :is-fetching="isFetching"

      @create="null"
      @filters="toggleFilters"
      @columns="null"
      @clear="toggleClear"
    />

    <AppTable
      :state="state"
      :error="error"
      :items="items"
      :is-fetching="isFetching"
      :columns="columns.customers"

      :filters="state.filters"
      :sort-by="state.sortBy"
      :sort-order="state.sortOrder"

      :class="[state.mode]"

      @sort="handleSort"
      @filter="handleFilter"
    />
  </div>
</template>