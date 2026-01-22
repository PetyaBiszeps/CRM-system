import { serverSupabaseClient } from '#supabase/server'
import type {
  IKanbanCard
} from '@/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from('kanban').select('*').order('index', {
    ascending: true
  })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
  return data as IKanbanCard[]
})