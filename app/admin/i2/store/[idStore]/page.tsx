'use client'
import { Card } from "@/components/ui/card"
import { StoreController } from "@/controller/StoreController"
import { IStore } from "@/interface/IStore"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import StoreInformations from "./components/StoreInformations"

const Store = () => {
  const searchParams = useParams<{ idStore: string }>()

  const [store, setStore] = useState<IStore>()
  const company = useCurrentCompany()

  useEffect(() => {
    async function load() {
      setStore(
        await StoreController.get(searchParams.idStore)
      )
    }
    load()
  }, [])

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-[70rem] mt-10">
        {store && company ?
          <div>
            <Card className="px-8 py-6">
            <StoreInformations company={company} store={store}/>
            </Card>
          </div>
          : ""
        }
      </div>
    </main>
  )
}
export default Store