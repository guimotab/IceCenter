import { IAddress } from "@/interface/IAddress";
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
import { IRevenueStore } from "@/interface/IRevenueStore";
import { IStockStore } from "@/interface/IStockStore";
import { IStore } from "@/interface/IStore";

export class Store implements IStore {
  private _id: string
  private _idCompany: string
  private _name: string
  private _address: IAddress
  private _stock: IStockStore
  private _revenue: IRevenueStore

  constructor(objectStore: IStore) {
    this._id = objectStore.id
    this._idCompany = objectStore.idCompany
    this._name = objectStore.name
    this._address = objectStore.address
    this._stock = objectStore.stock
    this._revenue = objectStore.revenue
  }

  changeFlavor(position: number, newFlavors: IFlavorsIceCream) {
    const flavors = [...this._stock.flavors]
    flavors.splice(position, 1, newFlavors)
    this._stock = { ...this._stock, flavors }
  }

  changeCone(cone: number) {
    this._stock = { ...this._stock, cone }
  }

  changeCash(discounted: number) {
    const cash = this._revenue.cash - discounted
    this._revenue = { ...this._revenue, cash }
  }

  informations() {
    return {
      id: this._id,
      idCompany: this._idCompany,
      name: this._name,
      address: this._address,
      revenue: this._revenue,
      stock: this._stock
    } as IStore
  }

  public get id(): string {
    return this._id;
  }
  public get idCompany(): string {
    return this._idCompany;
  }
  public get name(): string {
    return this._name;
  }
  public get address(): IAddress {
    return this._address;
  }
  public get stock(): IStockStore {
    return this._stock;
  }
  public get revenue(): IRevenueStore {
    return this._revenue;
  }


  public set id(value: string) {
    this._id = value;
  }
  public set idCompany(value: string) {
    this._idCompany = value;
  }
  public set name(value: string) {
    this._name = value;
  }
  public set address(value: IAddress) {
    this._address = value;
  }
  public set stock(value: IStockStore) {
    this._stock = value;
  }
  public set revenue(value: IRevenueStore) {
    this._revenue = value;
  }
}