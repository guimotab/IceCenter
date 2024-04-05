import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
import { IShoppingCart } from "@/interface/IShoppingCart";
import flavorsIceCream from "@/types/flavorsIceCream";

export class Cart {
  private _cart: IShoppingCart[];

  constructor(shoppingCart: IShoppingCart[]) {
    this._cart = shoppingCart
  }

  putQuantity(quantity: number, index: number) {
    const fakeCart = [...this._cart]
    
    const newShoppingCart = {
      ...this._cart[index],
      quantity
    } as IShoppingCart
    
    fakeCart.splice(index, 1, newShoppingCart)

    this._cart = fakeCart
  }

  public get cart() {
    return this._cart;
  }

  public set cart(value) {
    this._cart = value;
  }

}