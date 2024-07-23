import { useSetRecoilState } from "recoil"
import { shoppingCart } from "../atom"
import { IShoppingCart } from "@/interface/IShoppingCart"

export const useUpdateShoppingCart = () => {
  const setUseUpdateShoppingCart = useSetRecoilState<IShoppingCart[]>(shoppingCart)
  return (event: IShoppingCart[]) => {
    return setUseUpdateShoppingCart(event)
  }
}