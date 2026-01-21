import type { ColumnDef } from '@tanstack/vue-table'
import type {
  IGood,
  IOrder,
  IPayment,
  ICustomer
} from '@/types'

export interface ITable {
  goods: ColumnDef<IGood>[]
  orders: ColumnDef<IOrder>[]
  payments: ColumnDef<IPayment>[]
  customers: ColumnDef<ICustomer>[]
}

export interface IFilter {
  id: string
  value: string
}