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
const dropTargetId = ref<string | null>(null)
const {
  toggleDrawer
} = useStates()

const onDragOver = (e: DragEvent) => {
  isOver.value = true

  const target = e.target as HTMLElement
  const card = target.closest('.kanbanCard') as HTMLElement

  if (card) {
    dropTargetId.value = card.getAttribute('data-id')
  } else if (target.getAttribute('data-type') === 'filler') {
    dropTargetId.value = 'filler'
  } else {
    dropTargetId.value = null
  }
}

const onDragLeave = (e: DragEvent) => {
  if (!e.relatedTarget || !(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
    isOver.value = false
    dropTargetId.value = null
  }
}

const onDrop = (e: DragEvent) => {
  isOver.value = false
  dropTargetId.value = null

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
    :class="['kanbanColumn', {
      'is-over': isOver,
    }]"

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

        :class="[{
          'drop-target': dropTargetId === card.id,
        }]"

        @click.stop="toggleDrawer(card)"
      />

      <div
        class="filler"
        data-type="filler"

        :class="[{
          'drop-target': dropTargetId === 'filler',
        }]"
      />
    </main>
  </section>
</template>