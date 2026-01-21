import type {
  IOrder
} from '@/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await getCollectionFromDB<IOrder>(event, 'orders', {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    search: String(query.search || ''),
    filters: parseFilters<IOrder>(query.filters),
    searchFields: ['customer_name', 'items_preview'],
    sortBy: query.sortBy as keyof IOrder,
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  })
})