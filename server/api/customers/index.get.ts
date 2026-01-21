import type {
  ICustomer
} from '@/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await getCollectionFromDB<ICustomer>(event, 'customers', {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    search: String(query.search || ''),
    filters: parseFilters<ICustomer>(query.filters),
    searchFields: ['name', 'email', 'type'],
    sortBy: query.sortBy as keyof ICustomer,
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  })
})