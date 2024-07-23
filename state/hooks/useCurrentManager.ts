import { useRecoilValue } from "recoil"
import { currentManager } from "../atom"

const useCurrentManager = () => {
    return useRecoilValue(currentManager)
}
export default useCurrentManager