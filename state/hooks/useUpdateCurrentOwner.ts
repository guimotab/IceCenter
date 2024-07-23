import { useSetRecoilState } from "recoil"
import { currentOwner } from "../atom"
import { IOwner } from "@/interface/IOwner"

export const useUpdateCurrentOwner = () => {
  const setUseUpdateCurrentOwner = useSetRecoilState<IOwner>(currentOwner)
  return (event: IOwner) => {
    return setUseUpdateCurrentOwner(event)
  }
}