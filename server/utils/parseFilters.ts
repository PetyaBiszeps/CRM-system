export const parseFilters = <T>(rawFilters: unknown): Partial<Record<keyof T, string>> => {
  const filters: Partial<Record<keyof T, string>> = {}

  if (typeof rawFilters !== 'string' || !rawFilters) {
    return filters
  }

  try {
    const parsed = JSON.parse(rawFilters) as {
      id: string
      value: string
    }[]

    if (Array.isArray(parsed)) {
      parsed.forEach((f) => {
        if (f.id && f.value) {
          filters[f.id as keyof T] = String(f.value)
        }
      })
    }
  }
  catch (e) {
    console.error('Failed to parse filters:', e)
  }
  return filters
}