import { useSetRecoilState } from "recoil"
import { currentCompany } from "../atom"
import { ICompany } from "@/interface/ICompany"

export const useUpdateCurrentCompany = () => {
  const setUseUpdateCurrentCompany = useSetRecoilState<ICompany>(currentCompany)
  return (event: ICompany) => {
    return setUseUpdateCurrentCompany(event)
  }
}