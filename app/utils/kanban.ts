import type {
  IKanbanColumn
} from '@/types'

export const kanbanColumns: IKanbanColumn[] = [{
  title: 'Incoming',
  status: 'incoming',
  color: '#4A90E2'
}, {
  title: 'To be agreed',
  status: 'agree',
  color: '#9B59B6'
}, {
  title: 'In progress',
  status: 'progress',
  color: '#E67E22'
}, {
  title: 'Produced',
  status: 'produced',
  color: '#1ABC9C'
}, {
  title: 'Done',
  status: 'done',
  color: '#27AE60'
}]