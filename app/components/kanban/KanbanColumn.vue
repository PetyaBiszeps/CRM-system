<script setup lang="ts">
import type {
  IKanbanCard
} from '@/types'

const { title, color, status, cards } = defineProps<{
  title: string
  color: string
  status: string
  cards: IKanbanCard[]
}>()
const emit = defineEmits(['move'])

const isOver = ref<boolean>(false)

const onDragOver = () => {
  isOver.value = true
}

const onDragLeave = () => {
  isOver.value = false
}

const onDrop = (e: DragEvent) => {
  isOver.value = false

  const cardId = e.dataTransfer?.getData('text/plain')

  if (!cardId) {
    return
  }
  const target = e.target as HTMLElement
  const isFiller = target.getAttribute('data-type') === 'filler'
  const targetCard = target.closest('.kanbanCard') as HTMLElement

  emit('move', {
    cardId,
    toStatus: status,
    targetCardId: targetCard
      ? targetCard.getAttribute('data-id')
      : null,
    dropAtEnd: isFiller || !targetCard
  })
}
</script>

<template>
  <section
    :class="['kanbanColumn']"

    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <header :style="[{ backgroundColor: color }]">
      <h3>{{ title }}</h3>
    </header>

    <main>
      <KanbanCard
        v-for="card in cards"
        :key="card.id"

        :item="card"
        :data-id="card.id"
        :data-rank="card.rank"
      />

      <div
        class="filler"
        data-type="filler"
      />
    </main>
  </section>
</template>