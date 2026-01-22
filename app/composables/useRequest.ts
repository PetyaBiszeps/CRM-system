import {
  useMutation,
  useQueryClient
} from '@tanstack/vue-query'

export const useRequest = () => {
  const queryClient = useQueryClient()

  const invalidate = async (url: string) => {
    const base = url.split('/').filter(Boolean).slice(0, 2).join('/')

    await queryClient.invalidateQueries({
      queryKey: [`/${base}`]
    })
  }

  return {
    create: <T extends object, R>(url: string) => {
      const { data, mutate, isPending, error } = useMutation({
        mutationFn: (body: T) => $fetch<R>(url, {
          method: 'POST',
          body: body
        }),
        onSuccess: () => invalidate(url)
      })

      return {
        submit: mutate,
        isPending,
        error,
        data
      }
    },
    patch: <T extends {
      id: string | number
    }, R>(url: string) => {
      const { data, mutate, isPending, error } = useMutation({
        mutationFn: (body: T) => {
          const { id, ...payload } = body

          return $fetch<R>(`${url}/${id}`, {
            method: 'PATCH',
            body: payload
          })
        },
        onSuccess: () => invalidate(url)
      })

      return {
        submit: mutate,
        isPending,
        error,
        data
      }
    }
  }
}