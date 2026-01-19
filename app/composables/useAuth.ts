import type {
  IAuth
} from '@/types'

export const useAuth = () => {
  const router = useRouter()
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const loggedIn = computed(() => !!user.value)

  const login = async (credentials: IAuth) => {
    isLoading.value = true
    error.value = null

    try {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
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
    const { error } = await client.auth.signOut()

    if (error) {
      throw error
    }
    user.value = null
    await router.push('/login')
  }

  return {
    user, isLoading, error, loggedIn,
    login, logout
  }
}