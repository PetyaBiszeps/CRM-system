export const useAuth = () => {
  const router = useRouter()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const {
    user,
    clear,
    fetch,
    loggedIn
  } = useUserSession()

  const login = async (credentials: {
    email: string
    password: string
  }) => {
    isLoading.value = true
    error.value = null

    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      await fetch()
      await router.push('/')
    }
    catch (err: any) {
      error.value = err.data?.message || 'Authentication error'
      throw err
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await clear()
      await router.push('/login')
    }
    catch (err) {
      console.error('logout err', err)
    }
  }

  return {
    user, isLoading, error, loggedIn,
    login, logout
  }
}