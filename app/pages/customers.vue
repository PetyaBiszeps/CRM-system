<script setup lang="ts">
definePageMeta({
  title: 'pages.customers.title'
})

const { data, pending, error } = await useFetch('/api/customers')
</script>

<template>
  <AppTable
    :error="error"
    :items="data?.items"
    :pending="pending"
    :columns="columns.customers"
  />
</template>