import type {
  ColumnDef
} from '@tanstack/vue-table'
import type {
  ICustomer
} from '@/types'

export interface ITable {
  customers: ColumnDef<ICustomer>[]
}