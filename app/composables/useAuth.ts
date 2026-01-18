import type {
  IAuth
} from '@/types'

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

  const login = async (credentials: IAuth) => {
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
    catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      }
      else {
        error.value = String(err)
      }
    }
    finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    await clear()
    await router.push('/login')
  }

  return {
    user, isLoading, error, loggedIn,
    login, logout
  }
}