import type {
  ICustomer
} from '@/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filters: Partial<Record<keyof ICustomer, string>> = {}

  const rawFilters = query.filters as string

  if (rawFilters) {
    try {
      const parsedFilters = JSON.parse(rawFilters) as {
        id: string
        value: string
      }[]

      if (Array.isArray(parsedFilters)) {
        parsedFilters.forEach((f) => {
          if (f.id && f.value) {
            filters[f.id as keyof ICustomer] = String(f.value)
          }
        })
      }
    }
    catch (e) {
      console.error('Failed to parse filters:', e)
    }
  }

  return await getCustomersFromDB(event, {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    search: String(query.search || ''),
    filters: filters,
    sortBy: query.sortBy ? String(query.sortBy) : undefined,
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  })
})