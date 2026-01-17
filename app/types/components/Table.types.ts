import type {
  ColumnDef
} from '@tanstack/vue-table'
import type {
  ICustomer
} from '@/types'

export interface ITable {
  customers: ColumnDef<ICustomer>[]
}

export interface IFilter {
  id: string
  value: string
}