import type {
  ICustomers,
  ICustomer
} from '@/types'

interface GetCustomersOptions {
  page: number
  limit: number
  search: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

const MOCK_CUSTOMERS: ICustomer[] = [
  { id: 0, name: 'Ubisoft', email: 'business@ubi.com', type: 'customer', priority: 1 },
  { id: 1, name: 'CD PROJEKT RED', email: 'biz@cdprojektred.com', type: 'partner', priority: 2 },
  { id: 2, name: 'Bethesda', email: 'marketing@bethesda.us', type: 'customer', priority: 3 },
  { id: 3, name: 'Valve', email: 'noreply@steampowered.com', type: 'partner', priority: 4 },
  { id: 4, name: 'Sandfall', email: 'noreply@sandfall.fr', type: 'partner', priority: 5 },
  { id: 5, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 6, name: 'Sony', email: 'playstation.support@sony.com', type: 'partner', priority: 6 },
  { id: 7, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 8, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 9, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 10, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 11, name: 'Sony', email: 'playstation.support@sony.com', type: 'partner', priority: 6 },
  { id: 12, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 13, name: 'Sony', email: 'playstation.support@sony.com', type: 'partner', priority: 6 },
  { id: 14, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 15, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 },
  { id: 16, name: 'Sony', email: 'playstation.support@sony.com', type: 'customer', priority: 6 }
]

export async function getCustomersFromDB(opts: GetCustomersOptions): Promise<ICustomers> {
  await new Promise(resolve => setTimeout(resolve, 500))

  let result = MOCK_CUSTOMERS.filter((item) => {
    return item.name.toLowerCase().includes(opts.search.toLowerCase())
      || item.email.toLowerCase().includes(opts.search.toLowerCase())
  })

  if (opts.sortBy) {
    const col = opts.sortBy as keyof ICustomer
    const order = opts.sortOrder === 'desc' ? -1 : 1

    result = [...result].sort((a, b) => {
      if (a[col] < b[col]) {
        return -1 * order
      }

      if (a[col] > b[col]) {
        return 1 * order
      }
      return 0
    })
  }
  const start = (opts.page - 1) * opts.limit
  const filterItems = result.slice(start, start + opts.limit)

  return {
    items: filterItems,
    total: result.length
  }
}