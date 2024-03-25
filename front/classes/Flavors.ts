import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";

export class Flavors {
  private _stockId?: string;
  private _flavors: IFlavorsIceCream[]

  constructor(allFlavors: IFlavorsIceCream[]) {
    this._flavors = allFlavors
    if (allFlavors.length > 0) {
      this._stockId = allFlavors[0].stockId
    }
  }

  put(index: number, data: IFlavorsIceCream) {
    this.flavors.splice(index, 1, data)
  }

  public get flavors(): IFlavorsIceCream[] {
    return this._flavors;
  }
  public get stockId(): string {
    return this._stockId!;
  }

  public set flavors(value: IFlavorsIceCream[]) {
    this._flavors = value;
  }

}