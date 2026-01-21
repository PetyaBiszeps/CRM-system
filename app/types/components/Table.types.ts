import type {
  ColumnDef
} from '@tanstack/vue-table'
import type {
  IOrder,
  IPayment,
  ICustomer
} from '@/types'

export interface ITable {
  orders: ColumnDef<IOrder>[]
  payments: ColumnDef<IPayment>[]
  customers: ColumnDef<ICustomer>[]
}

export interface IFilter {
  id: string
  value: string
}