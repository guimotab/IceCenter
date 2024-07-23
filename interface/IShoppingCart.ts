import flavorsIceCream from "@/types/flavorsIceCream";

export interface IShoppingCart {
  item: flavorsIceCream | "Casquinha"
  quantity: number
}