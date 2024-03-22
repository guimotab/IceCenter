import { IStockStore } from "@/interface/IStockStore";

export class Stock implements IStockStore {
  private _id: string
  private _cone: number
  private _storeId: string

  constructor(objectStore: IStockStore) {
    this._id = objectStore.id
    this._cone = objectStore.cone
    this._storeId = objectStore.storeId
  }

  informations() {
    return {
      id: this._id,
      cone: this._cone,
      storeId: this._storeId,
    } as IStockStore
  }

  public get id(): string {
    return this._id;
  }
  public get cone(): number {
    return this._cone;
  }
  public get storeId(): string {
    return this._storeId;
  }


  public set id(value: string) {
    this._id = value;
  }
  public set cone(value: number) {
    this._cone = value;
  }
  public set storeId(value: string) {
    this._storeId = value;
  }
}