import { IRevenueStore } from "./IRevenueStore"
import { IStockStore } from "./IStockStore"

export interface IStore {
  id: string
  idCompany: string
  name: string
  stock: IStockStore
  revenue: IRevenueStore
}