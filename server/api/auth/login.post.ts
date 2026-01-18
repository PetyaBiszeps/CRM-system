export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (email === 'admin@test.com' && password === 'admin') {
    await setUserSession(event, {
      user: {
        id: 1,
        name: 'Yaroslav',
        email: 'admin@test.com'
      }
    })

    return {
      success: true
    }
  }

  throw createError({
    statusCode: 401,
    message: 'Invalid Credentials'
  })
})