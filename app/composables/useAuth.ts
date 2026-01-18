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

    await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })
    await fetch()
    await router.push('/')

    isLoading.value = false
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