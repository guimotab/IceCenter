import { useRecoilValue } from "recoil"
import { currentCompany } from "../atom"

const useCurrentCompany = () => {
    return useRecoilValue(currentCompany)
}
export default useCurrentCompany