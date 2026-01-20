import { type ColumnDef, createColumnHelper } from '@tanstack/vue-table'
import type {
  ITable,
  IOrder,
  ICustomer
} from '@/types'

const orderHelper = createColumnHelper<IOrder>()
const customerHelper = createColumnHelper<ICustomer>()

export const columns: ITable = {
  orders: [
    orderHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: () => null
    }),
    orderHelper.accessor('id', {
      id: 'id',
      header: 'ID',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('amount', {
      id: 'amount',
      header: 'Amount',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('currency', {
      id: 'currency',
      header: 'Currency',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Created At',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>
  ],
  customers: [
    customerHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: () => null
    }),
    customerHelper.accessor('id', {
      id: 'id',
      header: 'ID',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('name', {
      id: 'name',
      header: 'Name',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('email', {
      id: 'email',
      header: 'Email',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('type', {
      id: 'type',
      header: 'Type',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('priority', {
      id: 'priority',
      header: 'Priority',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Created At',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('updated_at', {
      id: 'updated_at',
      header: 'Updated At',
      cell: info => info.getValue()
    }) as ColumnDef<ICustomer>
  ]
}