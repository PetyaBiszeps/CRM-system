import { getCustomersFromDB } from '~~/server/utils/mockData'
import type {
  ICustomer
} from '@/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const filters: Partial<Record<keyof ICustomer, string>> = {}

  for (const [id, value] of Object.entries(query)) {
    if (id.startsWith('col_') && value) {
      const column = id.replace('col_', '') as keyof ICustomer

      filters[column] = String(value)
    }
  }

  return await getCustomersFromDB({
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    search: String(query.search || ''),
    filters: filters,
    sortBy: query.sortBy ? String(query.sortBy) : undefined,
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  })
})