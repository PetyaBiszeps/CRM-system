<script setup lang="ts">
definePageMeta({
  title: 'pages.customers.title'
})

const state = reactive({
  page: 1,
  limit: 10,
  search: '',
  sortBy: undefined as string | undefined,
  sortOrder: 'asc' as 'asc' | 'desc'
})

const { data, pending, error } = await useFetch('/api/customers', {
  query: state
})

const handleSort = (columnId: string) => {
  if (state.sortBy === columnId) {
    if (state.sortOrder === 'asc') {
      state.sortOrder = 'desc'
    }
    else {
      state.sortBy = undefined
    }
  }
  else {
    state.sortBy = columnId
    state.sortOrder = 'asc'
  }
}
</script>

<template>
  <AppTable
    :error="error"
    :items="data?.items"
    :pending="pending"
    :columns="columns.customers"

    :sort-by="state.sortBy"
    :sort-order="state.sortOrder"

    @sort="handleSort"
  />
</template>