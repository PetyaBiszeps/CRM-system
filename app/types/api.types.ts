export interface IAuth {
  email: string
  password: string
}

export interface IUser extends IAuth {
  id: string
}

export interface IResponse<T> {
  items: T[]
  total: number
}

export interface IGood {
  id: number
}

export interface IPayment {
  id: number
  amount: number
  currency: 'USD' | 'EUR' | 'UAH'
  status: 'pending' | 'confirmed' | 'failed' | 'refunded'
  customer: string
  created_at: Date
  updated_at: Date
}

export interface IOrder {
  id: number
  items_preview: string
  items_count: number
  total_price: number
  currency: 'USD' | 'EUR' | 'UAH'
  customer_name: string
  status: 'pending' | 'completed' | 'canceled'
  payment_status: 'paid' | 'unpaid'
  created_at: Date
  updated_at: Date
}

export interface ICustomer {
  id: number
  name: string
  email: string
  type: 'customer' | 'partner'
  priority: number
  created_at: Date
  updated_at: Date
}

export interface ISetting {
  id: number
}

export type IGoods = IResponse<IGood>
export type IPayments = IResponse<IPayment>
export type IOrders = IResponse<IOrder>
export type ICustomers = IResponse<ICustomer>
export type ISettings = IResponse<ISetting>