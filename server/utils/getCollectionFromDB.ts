import type { IResponse } from '@/types'
import type { H3Event } from 'h3'
import {
  serverSupabaseClient
} from '#supabase/server'

interface IOptionsDB<T> {
  page: number
  limit: number
  search: string
  searchFields: (keyof T)[]
  filters: Partial<Record<keyof T, string>>
  sortBy?: keyof T
  sortOrder?: 'asc' | 'desc'
}

export async function getCollectionFromDB<T>(
  e: H3Event, table: string, opts: IOptionsDB<T>
): Promise<IResponse<T>> {
  const client = await serverSupabaseClient(e)

  let query = client.from(table).select('*', {
    count: 'exact'
  })

  if (opts.search && opts.search.length) {
    const globalSearch = opts.searchFields
      .map(col => `${String(col)}.ilike.%${opts.search}%`).join(', ')

    query = query.or(globalSearch)
  }

  if (opts.filters) {
    Object.entries(opts.filters).forEach(([column, value]) => {
      if (value) {
        query = query.ilike(column as string, `%${value}%`)
      }
    })
  }
  const sortBy = opts.sortBy as string || 'created_at'
  const ascending = opts.sortOrder === 'asc'

  const from = (opts.page - 1) * opts.limit
  const to = from + opts.limit - 1

  query = query.order(sortBy, {
    ascending: ascending
  }).range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return {
    items: (data as T[]) || [],
    total: count || 0
  }
}