export const useTable = <T>(url: string) => {
  const state = reactive({
    page: 1,
    limit: 10,
    search: '',
    filters: {} as Record<string, string>,
    sortBy: undefined as string | undefined,
    sortOrder: 'asc' as 'asc' | 'desc'
  })

  const params = computed(() => {
    const query: Record<string, unknown> = {
      page: state.page,
      limit: state.limit,
      search: state.search,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder
    }

    Object.entries(state.filters).forEach(([key, value]) => {
      if (value) {
        query[`col_${key}`] = value
      }
    })

    return query
  })

  const { data, pending, error } = useFetch<{
    items: T[]
    total: number
  }>(url, {
    query: params
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

  const toggleFilter = (columnId: string, columnValue: string) => {
    if (!columnValue) {
      const { [columnId]: _, ...rest } = state.filters
      state.filters = rest
    }
    else {
      state.filters[columnId] = columnValue
    }
  }

  watch([() => state.search, () => state.filters], () => {
    state.page = 1
  }, { deep: true })

  return {
    ...toRefs(state),
    items: computed(() => data.value?.items || []),
    total: computed(() => data.value?.total || 0),

    data,
    state,
    error,
    pending,
    toggleSort,
    toggleFilter
  }
}