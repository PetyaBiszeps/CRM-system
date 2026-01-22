import type {
  IKanbanCard
} from '@/types'

interface IStates {
  isDrawer: boolean
  activeCard: IKanbanCard | null
  isCreating: boolean
  isFilters: boolean
  isColumns: boolean
  mode: 'default' | 'compact'
}

export const useStates = () => {
  const ui = useState<IStates>('ui', () => ({
    isDrawer: false,
    activeCard: null,
    isCreating: false,
    isFilters: false,
    isColumns: false,
    mode: 'default'
  }))

  const toggleDrawer = (card: IKanbanCard) => {
    ui.value.activeCard = card
    ui.value.isDrawer = !ui.value.isDrawer
  }

  const closeDrawer = () => {
    ui.value.isDrawer = false
    ui.value.activeCard = null
  }

  const toggleCreation = () => {
    ui.value.isCreating = !ui.value.isCreating
  }

  const toggleFilters = () => {
    ui.value.isFilters = !ui.value.isFilters
  }

  const toggleColumns = () => {
    ui.value.isColumns = !ui.value.isColumns
  }

  const cancelCreating = () => {
    ui.value.isCreating = false
  }

  return {
    ...toRefs(ui.value),

    ui,
    toggleDrawer,
    closeDrawer,
    toggleCreation,
    toggleFilters,
    toggleColumns,
    cancelCreating
  }
}