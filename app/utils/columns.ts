import { type ColumnDef, createColumnHelper } from '@tanstack/vue-table'
import type {
  ITable,
  ICustomer
} from '@/types'

const customerHelper = createColumnHelper<ICustomer>()

export const columns: ITable = {
  customers: [
    customerHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('type', {
      header: 'Type',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('priority', {
      header: 'Priority',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>
  ]
}