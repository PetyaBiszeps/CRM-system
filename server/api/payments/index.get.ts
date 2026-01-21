import type {
  IPayment
} from '@/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await getCollectionFromDB<IPayment>(event, 'payments', {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    search: String(query.search || ''),
    filters: parseFilters<IPayment>(query.filters),
    searchFields: ['customer'],
    sortBy: query.sortBy as keyof IPayment,
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  })
})