<script setup lang="ts">
import type {
  ICustomers
} from '@/types'

definePageMeta({
  title: 'pages.customers.title'
})

const data: ICustomers = {
  items: [
    { id: 0, name: 'Ubisoft', email: 'business@ubi.com', type: 'customer', priority: 1 },
    { id: 1, name: 'CD PROJEKT RED', email: 'biz@cdprojektred.com', type: 'partner', priority: 2 },
    { id: 2, name: 'Bethesda', email: 'marketing@bethesda.us', type: 'customer', priority: 3 },
    { id: 3, name: 'Valve', email: 'noreply@steampowered.com', type: 'partner', priority: 4 },
    { id: 4, name: 'Sandfall', email: 'noreply@sandfall.fr', type: 'partner', priority: 5 },
    { id: 5, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 }
  ],
  total: 4
}
</script>

<template>
  <AppTable :items="data.items" />
</template>