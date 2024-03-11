import { useRecoilValue } from "recoil"
import { currentOwner } from "../atom"

const useCurrentOwner = () => {
    return useRecoilValue(currentOwner)
}
export default useCurrentOwner