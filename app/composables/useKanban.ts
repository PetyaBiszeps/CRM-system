import { useQuery } from '@tanstack/vue-query'
import { LexoRank } from 'lexorank'
import type {
  IMoveEvent,
  IKanbanCard
} from '@/types'

export const useKanban = (url: string) => {
  const {
    submit: patch
  } = useRequest().patch<Partial<IKanbanCard> & {
    id: string
  }, IKanbanCard>(url)

  const { data } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      return await $fetch<IKanbanCard[]>(url)
    }
  })
  const items = computed(() => data.value || [])

  const getCardsByStatus = (status: string) => {
    return items.value
      .filter((card: IKanbanCard) => card.status === status)
      .sort((a, b) => (a.rank || '').localeCompare(b.rank || ''))
  }

  const handleMove = async (data: IMoveEvent) => {
    const card = items.value.find(deal => deal.id === data.cardId)

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

    return patch({
      id: card.id,
      rank: newRank,
      status: data.toStatus
    })
  }

  return {
    items,
    getCardsByStatus, handleMove
  }
}