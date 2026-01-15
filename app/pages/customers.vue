<script setup lang="ts">
import type {
  ICustomers
} from '@/types'

const data: ICustomers = {
  items: [
    { id: 0, name: 'Ubisoft', email: 'business@ubi.com', type: 'customer', priority: 1 },
    { id: 1, name: 'CD PROJEKT RED', email: 'biz@cdprojektred.com', type: 'partner', priority: 2 },
    { id: 2, name: 'Bethesda', email: 'marketing@bethesda.us', type: 'customer', priority: 3 },
    { id: 3, name: 'Valve', email: 'noreply@steampowered.com', type: 'partner', priority: 4 }
  ],
  total: 4
}
</script>

<template>
  <div class="customersPage">
    <LayoutTable :items="data.items" />
  </div>
</template>