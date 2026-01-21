<script setup lang="ts">
import type {
  IGood
} from '@/types'

definePageMeta({
  title: 'pages.goods.title'
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
} = useTable<IGood>('/api/goods')
</script>

<template>
  <div :class="['goodsPage']">
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
      :columns="columns.goods"

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