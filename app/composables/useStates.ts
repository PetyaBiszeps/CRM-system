interface IStates {
  isFilters: boolean
  isColumns: boolean
  isCreating: boolean
  mode: 'default' | 'compact'
}

export const useStates = () => {
  const ui = useState<IStates>('ui', () => ({
    isFilters: false,
    isColumns: false,
    isCreating: false,
    mode: 'default'
  }))

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
    toggleCreation,
    toggleFilters,
    toggleColumns,
    cancelCreating
  }
}