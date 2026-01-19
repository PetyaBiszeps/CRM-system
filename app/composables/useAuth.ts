import type {
  IAuth
} from '@/types'

export const useAuth = () => {
  const router = useRouter()
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const isLoading = ref<boolean>(false)

  const loggedIn = computed(() => !!user.value)

  const register = async (credentials: IAuth) => {
    isLoading.value = true

    await $fetch('/api/auth/register', {
      method: 'POST',
      body: credentials
    })
    const { data, error } = await client.auth.refreshSession()

    if (error) {
      throw error
    }

    if (data.user) {
      user.value = (data.user as unknown) as typeof user.value

      await router.push('/')
    }
    isLoading.value = false
  }

  const login = async (credentials: IAuth) => {
    isLoading.value = true

    await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    })
    const { data, error } = await client.auth.refreshSession()

    if (error) {
      throw error
    }

    if (data.user) {
      user.value = (data.user as unknown) as typeof user.value

      await router.push('/')
    }
    isLoading.value = false
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
    user, isLoading, loggedIn,
    register, login, logout
  }
}