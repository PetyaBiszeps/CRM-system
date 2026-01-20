<script setup lang="ts">
import type {
  ICustomer
} from '@/types'

definePageMeta({
  title: 'pages.customers.title'
})

const {
  ui,
  mode,
  toggleCreation,
  toggleFilters,
  toggleColumns,
  cancelCreating
} = useStates()

const {
  page,
  items,
  limit,
  error,
  total,
  search,
  sortBy,
  filters,
  sortOrder,
  isFetching,
  clearFilters,
  handleSort,
  handleFilter,
  handleSave
} = useTable<ICustomer>('/api/customers')
</script>

<template>
  <div :class="['customersPage']">
    <AppToolbar
      v-model:search="search"
      v-model:limit="limit"
      v-model:page="page"
      v-model:mode="mode"

      :total="total"
      :is-fetching="isFetching"

      @create="toggleCreation"
      @filters="toggleFilters"
      @columns="toggleColumns"
      @clear="clearFilters"
    />

    <AppTable
      :ui="ui"
      :error="error"
      :items="items"
      :is-fetching="isFetching"
      :columns="columns.customers"

      :filters="filters"
      :sort-by="sortBy"
      :sort-order="sortOrder"

      :class="[mode]"

      @sort="handleSort"
      @filter="handleFilter"

      @save="handleSave"
      @cancel="cancelCreating"
    />
  </div>
</template>