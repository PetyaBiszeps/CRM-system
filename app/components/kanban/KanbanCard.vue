<script setup lang="ts">
import type {
  IKanbanCard
} from '@/types'

const { item } = defineProps<{
  item: IKanbanCard
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD'
  }).format(price)
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: '2-digit', month: 'short'
  })
}

const onDragStart = (e: DragEvent) => {
  if (e.dataTransfer) {
    e.dataTransfer.setData('text/plain', item.id.toString())
    e.dataTransfer.effectAllowed = 'move'
  }
  (e.target as HTMLElement).classList.add('is-dragging')
}

const onDragEnd = (e: DragEvent) => {
  (e.target as HTMLElement).classList.remove('is-dragging')
}
</script>

<template>
  <section
    :class="['kanbanCard']"
    :draggable="true"

    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <header>
      <h4>{{ item.title }}</h4>
      <span>{{ formatPrice(item.price) }}</span>
    </header>

    <main>
      <article>
        <span class="label">Customer:</span>
        <span class="value">{{ item.customer }}</span>
      </article>

      <article>
        <span class="label">Received:</span>
        <span class="value">{{ formatDate(item.created_at) }}</span>
      </article>
    </main>
  </section>
</template>