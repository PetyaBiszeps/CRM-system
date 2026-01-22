<script setup lang="ts">
import type {
  IKanbanCard
} from '@/types'

const { card } = defineProps<{
  card: IKanbanCard | null
}>()
</script>

<template>
  <header>
    <ul>
      <li>
        <p>Task:</p>
        <h3>{{ card?.title }}</h3>
      </li>

      <li>
        <p>Price</p>
        <h4>{{ card?.price }}</h4>
      </li>

      <li>
        <p>Status</p>
        <h4>{{ card?.status }}</h4>
      </li>

      <li>
        <p>Customer</p>
        <h4>{{ card?.customer }}</h4>
      </li>

      <li>
        <p>Creation Date</p>
        <h4>{{ card?.created_at }}</h4>
      </li>
    </ul>
  </header>
</template>