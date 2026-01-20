<script setup lang="ts">
import type {
  ICustomer
} from '@/types'

definePageMeta({
  title: 'pages.customers.title'
})

const {
  mode
} = useUi()

const {
  page,
  items,
  state,
  error,
  total,
  search,
  isFetching,
  toggleCreation,
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
      v-model:search="search"
      v-model:page="page"
      v-model:mode="mode"

      :state="state"

      :total="total"
      :is-fetching="isFetching"

      @create="toggleCreation"
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

      :class="[mode]"

      @sort="handleSort"
      @filter="handleFilter"
    />
  </div>
</template>