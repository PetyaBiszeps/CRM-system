interface IResponse<T> {
  items: T[]
  total: number
}

interface IGood {
  id: number
}

interface IPayment {
  id: number
}

interface IOrder {
  id: number
  amount: number
  status: 'pending' | 'completed' | 'canceled'
  currency: 'USD' | 'EUR' | 'UAH'
  createdAt: Date
}

interface ICustomer {
  id: number
  name: string
  email: string
  type: 'customer' | 'partner'
  priority: number
}

interface ISetting {
  id: number
}

export type IGoods = IResponse<IGood>
export type IPayments = IResponse<IPayment>
export type IOrders = IResponse<IOrder>
export type ICustomers = IResponse<ICustomer>
export type ISettings = IResponse<ISetting>