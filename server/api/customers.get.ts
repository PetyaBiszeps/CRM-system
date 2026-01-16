import { getCustomersFromDB } from '~~/server/utils/mockData'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return await getCustomersFromDB({
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    search: String(query.search || ''),
    sortBy: query.sortBy ? String(query.sortBy) : undefined,
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  })
})