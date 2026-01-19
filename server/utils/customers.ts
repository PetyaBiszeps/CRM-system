import type { ICustomer, ICustomers } from '@/types'
import type { H3Event } from 'h3'
import {
  serverSupabaseClient
} from '#supabase/server'

interface GetCustomersOptions {
  page: number
  limit: number
  search: string
  filters: Partial<Record<keyof ICustomer, string>>
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export async function getCustomersFromDB(event: H3Event, opts: GetCustomersOptions): Promise<ICustomers> {
  const client = await serverSupabaseClient(event)

  let query = client.from('customers').select('*', {
    count: 'exact'
  })

  if (opts.search) {
    query = query.or(`name.ilike.%${opts.search}%,email.ilike.%${opts.search}%,type.ilike.%${opts.search}%`)
  }

  if (opts.filters && Object.keys(opts.filters).length > 0) {
    Object.entries(opts.filters).forEach(([column, value]) => {
      if (value) {
        query = query.ilike(column, `%${value}%`)
      }
    })
  }
  const sortBy = opts.sortBy || 'id'
  const ascending = opts.sortOrder === 'asc'

  query = query.order(sortBy, {
    ascending: ascending
  })
  const from = (opts.page - 1) * opts.limit
  const to = from + opts.limit - 1

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return {
    items: (data as ICustomer[]) || [],
    total: count || 0
  }
}