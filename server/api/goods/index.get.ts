import type {
  IGood
} from '@/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await getCollectionFromDB<IGood>(event, 'goods', {
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    search: String(query.search || ''),
    filters: parseFilters<IGood>(query.filters),
    searchFields: ['name', 'description', 'sku', 'category'],
    sortBy: query.sortBy as keyof IGood,
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  })
})