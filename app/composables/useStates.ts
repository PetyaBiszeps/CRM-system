interface IStates {
  isDrawer: boolean
  isCreating: boolean
  isFilters: boolean
  isColumns: boolean
  mode: 'default' | 'compact'
}

export const useStates = () => {
  const ui = useState<IStates>('ui', () => ({
    isDrawer: false,
    isCreating: false,
    isFilters: false,
    isColumns: false,
    mode: 'default'
  }))

  const toggleDrawer = () => {
    ui.value.isDrawer = !ui.value.isDrawer
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
    toggleCreation,
    toggleFilters,
    toggleColumns,
    cancelCreating
  }
}