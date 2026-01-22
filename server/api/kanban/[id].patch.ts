import { serverSupabaseClient } from '#supabase/server'
import type {
  IKanbanCard
} from '@/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is missing'
    })
  }
  const { data, error } = await (client as any).from('kanban').update({
    status: body.status,
    rank: body.rank
  }).eq('id', id).select().single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
  return data as IKanbanCard
})