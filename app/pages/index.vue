<script setup lang="ts">
import { LexoRank } from 'lexorank'
import type {
  IMoveEvent,
  IKanbanCard
} from '@/types'

definePageMeta({
  title: 'pages.kanban.title'
})

const deals = ref<IKanbanCard[]>([{
  id: 1,
  title: 'Bethesda Project',
  price: 1200,
  customer: 'Bethesda',
  created_at: '2025-11-20',
  status: 'incoming',
  rank: LexoRank.middle().toString()
}, {
  id: 2,
  title: 'Ubisoft UI',
  price: 3500,
  customer: 'Ubisoft',
  created_at: '2025-11-21',
  status: 'incoming',
  rank: LexoRank.middle().genNext().toString()
}])

const getCardsByStatus = (status: string) => {
  return deals.value
    .filter(deal => deal.status === status)
    .sort((a, b) => a.rank.localeCompare(b.rank))
}

const handleMove = async (data: IMoveEvent) => {
  const card = deals.value.find(deal => deal.id === data.cardId)

  if (!card) {
    return
  }
  const targetCards = getCardsByStatus(data.toStatus)
    .filter(deal => deal.id !== data.cardId)

  let newRank: string

  if (targetCards.length === 0) {
    newRank = LexoRank.middle().toString()
  }
  else if (data.dropAtEnd) {
    const lastCard = targetCards[targetCards.length - 1]

    newRank = lastCard
      ? LexoRank.parse(lastCard.rank).genNext().toString()
      : LexoRank.middle().toString()
  }
  else if (data.targetCardId) {
    const targetIdx = targetCards.findIndex(deal => deal.id === data.targetCardId)
    const nextCard = targetCards[targetIdx]
    const prevCard = targetCards[targetIdx - 1]

    if (nextCard) {
      if (!prevCard) {
        newRank = LexoRank.parse(nextCard.rank).genPrev().toString()
      }
      else {
        newRank = LexoRank.parse(prevCard.rank).between(LexoRank.parse(nextCard.rank)).toString()
      }
    }
    else {
      newRank = LexoRank.middle().toString()
    }
  }
  else {
    newRank = LexoRank.middle().toString()
  }
  card.status = data.toStatus
  card.rank = newRank

  // ToDo -supabase await request
}
</script>

<template>
  <div :class="['kanbanPage']">
    <KanbanColumn
      v-for="col in kanbanColumns"
      :key="col.status"

      :title="col.title"
      :status="col.status"
      :color="col.color"
      :cards="getCardsByStatus(col.status)"

      @move="handleMove"
    />
  </div>
</template>