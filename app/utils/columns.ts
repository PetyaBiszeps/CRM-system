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
    orderHelper.accessor('items_preview', {
      id: 'items_preview',
      header: 'Preview',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('items_count', {
      id: 'items_count',
      header: 'Count',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('total_price', {
      id: 'total_price',
      header: 'Total Price',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('currency', {
      id: 'currency',
      header: 'Currency',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('customer_name', {
      id: 'customer_name',
      header: 'Customer',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('payment_status', {
      id: 'payment_status',
      header: 'Payment Status',
      cell: info => info.getValue()
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('created_at', {
      id: 'created_at',
      header: 'Created At',
      cell: (info) => {
        const date = info.getValue()

        return date
          ? new Date(date).toLocaleDateString('uk-UA')
          : ''
      }
    }) as ColumnDef<IOrder>,
    orderHelper.accessor('updated_at', {
      id: 'updated_at',
      header: 'Updated At',
      cell: (info) => {
        const date = info.getValue()

        return date
          ? new Date(date).toLocaleDateString('uk-UA')
          : ''
      }
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
      cell: (info) => {
        const date = info.getValue()

        return date
          ? new Date(date).toLocaleDateString('uk-UA')
          : ''
      }
    }) as ColumnDef<ICustomer>,
    customerHelper.accessor('updated_at', {
      id: 'updated_at',
      header: 'Updated At',
      cell: (info) => {
        const date = info.getValue()

        return date
          ? new Date(date).toLocaleDateString('uk-UA')
          : ''
      }
    }) as ColumnDef<ICustomer>
  ]
}