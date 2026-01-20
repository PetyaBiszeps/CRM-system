import { useQuery } from '@tanstack/vue-query'
import type {
  IFilter
} from '@/types'

export const useTable = <T extends object, B extends object = T>(url: string) => {
  const states = useStates()

  const {
    submit: create
  } = useRequest().create<B, T>(`${url}/create`)

  const state = reactive({
    page: 1,
    limit: 10,
    search: '',
    filters: [] as IFilter[],
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

    if (state.filters.length) {
      query.filters = JSON.stringify(state.filters)
    }
    return query
  })

  const { data, isFetching, error } = useQuery({
    queryKey: [url, params],

    placeholderData: previousData => previousData,
    queryFn: async () => {
      return await $fetch<{
        items: T[]
        total: number
      }>(url, {
        query: params.value
      })
    }
  })

  const clearFilters = () => {
    state.page = 1
    state.search = ''
    state.sortBy = ''
    state.filters = []
    state.sortOrder = 'asc'
  }

  const handleSort = (columnId: string) => {
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

  const handleFilter = (columnId: string, columnValue: string) => {
    const filter = state.filters.find(filter => filter.id === columnId)

    if (!columnValue) {
      if (filter) {
        state.filters = state.filters.filter(f => f.id !== columnId)
      }
    }
    else {
      if (filter) {
        filter.value = columnValue
      }
      else {
        state.filters.push({ id: columnId, value: columnValue })
      }
    }
  }

  const handleSave = async (payload: B) => {
    create(payload, {
      onSuccess: () => {
        states.cancelCreating()
      }
    })
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
    isFetching,
    clearFilters,
    handleSort,
    handleFilter,
    handleSave
  }
}