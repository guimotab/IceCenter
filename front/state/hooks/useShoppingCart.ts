import { useRecoilValue } from "recoil"
import { shoppingCart } from "../atom"

const useShoppingCart = () => {
    return useRecoilValue(shoppingCart)
}
export default useShoppingCart