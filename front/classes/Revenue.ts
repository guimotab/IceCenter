import { IRevenueStore } from "@/interface/IRevenueStore";

export class Revenue implements IRevenueStore {
  private _id: string
  private _storeId: string
  private _cash: number;

  constructor(objectStore: IRevenueStore) {
    this._id = objectStore.id
    this._storeId = objectStore.storeId
    this._cash = objectStore.cash;
  }

  informations() {
    return {
      id: this._id,
      storeId: this._storeId,
      cash: this._cash,
    } as IRevenueStore
  }
  putAmount(newCash: number) {
    this.cash += newCash
  }

  public get id(): string {
    return this._id;
  }
  public get storeId(): string {
    return this._storeId;
  }
  public get cash(): number {
    return this._cash;
  }


  public set id(value: string) {
    this._id = value;
  }
  public set storeId(value: string) {
    this._storeId = value;
  }
  public set cash(value: number) {
    this._cash = value;
  }

}