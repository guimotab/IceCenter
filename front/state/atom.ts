import { ICompany } from "@/interface/ICompany";
import { IManager } from "@/interface/IManager";
import { IOwner } from "@/interface/IOwner";
import { IShoppingCart } from "@/interface/IShoppingCart";
import { IStore } from "@/interface/IStore";
import { atom } from "recoil";

export const startShoppingCart = [
  {
    item: "Baunilha",
    quantity: 0
  },{
    item: "Casquinha",
    quantity: 0
  },{
    item: "Chocolate",
    quantity: 0
  },{
    item: "Morango",
    quantity: 0
  },
] as IShoppingCart[]

export const currentOwner = atom<IOwner>({
  key: 'currentOwner',
  default: undefined,
});

export const currentCompany = atom<ICompany>({
  key: 'currentCompany',
  default: undefined,
});

export const currentManager = atom<IManager>({
  key: 'currentManager',
  default: undefined,
});

export const currentStore = atom<IStore>({
  key: 'currentStore',
  default: undefined,
});

export const shoppingCart = atom<IShoppingCart[]>({
  key: 'shoppingCart',
  default: startShoppingCart,
});
