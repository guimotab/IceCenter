import { IStore } from "@/interface/IStore";

export class Store implements IStore {
  private _id: string
  private _companyId: string
  private _name: string

  constructor(objectStore: IStore) {
    this._id = objectStore.id
    this._companyId = objectStore.companyId
    this._name = objectStore.name
  }

  // changeFlavor(position: number, newFlavors: IFlavorsIceCream) {
  //   const flavors = [...this._stock.flavors]
  //   flavors.splice(position, 1, newFlavors)
  //   this._stock = { ...this._stock, flavors }
  // }

  // changeCone(cone: number) {
  //   this._stock = { ...this._stock, cone }
  // }

  // changeCash(discounted: number) {
  //   const cash = this._revenue.cash - discounted
  //   this._revenue = { ...this._revenue, cash }
  // }

  informations() {
    return {
      id: this._id,
      companyId: this._companyId,
      name: this._name,
    } as IStore
  }

  public get id(): string {
    return this._id;
  }
  public get companyId(): string {
    return this._companyId;
  }
  public get name(): string {
    return this._name;
  }


  public set id(value: string) {
    this._id = value;
  }
  public set companyId(value: string) {
    this._companyId = value;
  }
  public set name(value: string) {
    this._name = value;
  }
}