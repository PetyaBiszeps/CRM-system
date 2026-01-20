export const useUi = () => {
  const ui = reactive({
    isFilters: false,
    isCreating: false,
    mode: 'default' as 'default' | 'compact'
  })

  const toggleCreation = () => {
    ui.isCreating = !ui.isCreating
  }

  const toggleFilters = () => {
    ui.isFilters = !ui.isFilters
  }

  return {
    ...toRefs(ui),

    ui,
    toggleCreation,
    toggleFilters
  }
}