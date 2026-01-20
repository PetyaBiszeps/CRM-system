import type {
  ColumnDef
} from '@tanstack/vue-table'
import type {
  IOrder,
  ICustomer
} from '@/types'

export interface ITable {
  orders: ColumnDef<IOrder>[]
  customers: ColumnDef<ICustomer>[]
}

export interface IFilter {
  id: string
  value: string
}