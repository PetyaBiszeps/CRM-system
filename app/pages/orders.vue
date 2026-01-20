<script setup lang="ts">
import type {
  IOrder
} from '@/types'

definePageMeta({
  title: 'pages.orders.title'
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
} = useTable<IOrder>('/api/orders')
</script>

<template>
  <div :class="['ordersPage']">
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
      :columns="columns.orders"

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