export interface IKanbanColumn {
  title: string
  status: string
  color: string
}

export interface IKanbanCard {
  id: number
  title: string
  price: number
  customer: string
  created_at: string
  status: string
  rank: string
}

export interface IMoveEvent {
  cardId: number
  toStatus: string
  targetCardId: number | null
  dropAtEnd: boolean
}