export interface IKanbanColumn {
  title: string
  status: string
  color: string
}

export interface IKanbanCard {
  id: string
  title: string
  price: number
  customer: string
  created_at: string
  status: string
  rank: string
  is_global: boolean
}

export interface IMoveEvent {
  cardId: string
  toStatus: string
  targetCardId: string | null
  dropAtEnd: boolean
}