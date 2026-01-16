<script setup lang="ts">
definePageMeta({
  title: 'pages.customers.title'
})

const {
  page,
  state,
  search,
  toggleSort
} = useTable()

const { data, pending, error } = await useFetch('/api/customers', {
  query: state
})
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