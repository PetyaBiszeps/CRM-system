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

  const { data, error } = await client.from('goods').insert({
    name: body.name,
    description: body.description,
    sku: body.sku,
    price: body.price,
    currency: body.currency,
    category: body.category,
    stock: body.stock,
    status: body.status,
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