import { IRevenueStore } from "@/interface/IRevenueStore";

export class Revenue implements IRevenueStore {
  private _id: string
  private _storeId: string
  private _cash: number;
  private _profit: number;
  private _expenses: number;

  constructor(objectStore: IRevenueStore) {
    this._id = objectStore.id
    this._storeId = objectStore.storeId
    this._cash = objectStore.cash;
    this._profit = objectStore.profit;
    this._expenses = objectStore.expenses;
  }

  informations() {
    return {
      id: this._id,
      storeId: this._storeId,
      cash: this._cash,
      expenses: this._expenses,
      profit: this._profit,
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
  public get profit(): number {
    return this._profit;
  }
  public get expenses(): number {
    return this._expenses;
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
  public set profit(value: number) {
    this._profit = value;
  }
  public set expenses(value: number) {
    this._expenses = value;
  }
}