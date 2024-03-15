import { useSetRecoilState } from "recoil"
import { currentManager } from "../atom"
import { IManager } from "@/interface/IManager"

export const useUpdateCurrentManager = () => {
  const setUseUpdateCurrentManager = useSetRecoilState<IManager>(currentManager)
  return (event: IManager) => {
    return setUseUpdateCurrentManager(event)
  }
}