import {
  serverSupabaseUser,
  serverSupabaseClient
} from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<any>(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
  const body = await readBody(event)

  const { data, error } = await client.from('orders').insert({
    items_preview: body.items_preview,
    items_count: body.items_count,
    total_price: body.total_price,
    currency: body.currency,
    customer_name: body.customer_name,
    status: body.status,
    payment_status: body.payment_status,
    user_id: user.id
  }).select().single()

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message
    })
  }
  return data
})