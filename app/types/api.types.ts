export interface IResponse<T> {
  items: T[]
  total: number
}

export interface IGood {
  id: number
}

export interface IPayment {
  id: number
}

export interface IOrder {
  id: number
  amount: number
  status: 'pending' | 'completed' | 'canceled'
  currency: 'USD' | 'EUR' | 'UAH'
  createdAt: Date
}

export interface ICustomer {
  id: number
  name: string
  email: string
  type: 'customer' | 'partner'
  priority: number
}

export interface ISetting {
  id: number
}

export type IGoods = IResponse<IGood>
export type IPayments = IResponse<IPayment>
export type IOrders = IResponse<IOrder>
export type ICustomers = IResponse<ICustomer>
export type ISettings = IResponse<ISetting>