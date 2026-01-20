export const useUiStore = defineStore('ui', () => {
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

  const cancelCreating = () => {
    ui.isCreating = false
  }

  return {
    ...toRefs(ui),

    ui,
    toggleCreation,
    toggleFilters,
    toggleColumns,
    cancelCreating
  }
})