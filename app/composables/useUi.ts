export const useUi = () => {
  const ui = reactive({
    isFilters: false,
    isColumns: false,
    isCreating: false,
    mode: 'default' as 'default' | 'compact'
  })

  const toggleCreation = () => {
    ui.isCreating = !ui.isCreating
  }

  const toggleFilters = () => {
    ui.isFilters = !ui.isFilters
  }

  const toggleColumns = () => {
    ui.isColumns = !ui.isColumns
  }

  return {
    ...toRefs(ui),

    ui,
    toggleCreation,
    toggleFilters,
    toggleColumns
  }
}