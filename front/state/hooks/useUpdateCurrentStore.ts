import { useSetRecoilState } from "recoil"
import { currentStore } from "../atom"
import { IStore } from "@/interface/IStore"

export const useUpdateCurrentStore = () => {
  const setUseUpdateCurrentStore = useSetRecoilState<IStore>(currentStore)
  return (event: IStore) => {
    return setUseUpdateCurrentStore(event)
  }
}