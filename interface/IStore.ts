import { IRevenueStore } from "./IRevenueStore"
import { IStockStore } from "./IStockStore"
import { IAddress } from "./iAddress"

export interface IStore {
  id: string
  idCompany: string
  name: string
  address: IAddress
  stock: IStockStore
  revenue: IRevenueStore
}