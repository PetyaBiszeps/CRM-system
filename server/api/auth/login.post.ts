import {
  serverSupabaseClient
} from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const client = await serverSupabaseClient(event)

  console.log('Попытка входа:', body.email, body.password)

  const { data, error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.password
  })

  if (error) {
    throw createError({
      statusCode: 401,
      statusMessage: error.message
    })
  }

  return {
    success: true,
    user: data.user
  }
})