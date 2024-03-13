import { useRecoilValue } from "recoil"
import { currentStore } from "../atom"

const useCurrentStore = () => {
    return useRecoilValue(currentStore)
}
export default useCurrentStore