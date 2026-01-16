export const useTable = () => {
  const state = reactive({
    page: 1,
    limit: 10,
    search: '',
    sortBy: undefined as string | undefined,
    sortOrder: 'asc' as 'asc' | 'desc'
  })

  const toggleSort = (columnId: string) => {
    if (state.sortBy === columnId) {
      if (state.sortOrder === 'asc') {
        state.sortOrder = 'desc'
      }
      else {
        state.sortBy = undefined
        state.sortOrder = 'asc'
      }
    }
    else {
      state.sortBy = columnId
      state.sortOrder = 'asc'
    }
  }

  watch(() => state.search, () => {
    state.page = 1
  })

  return {
    ...toRefs(state),

    state,
    toggleSort
  }
}