'use client'
import { Card } from "@/components/ui/card"
import { StoreController } from "@/controller/StoreController"
import { IStore } from "@/interface/IStore"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Store = () => {

  const searchParams = useParams<{ nameStore: string }>()
  const router = useRouter()
  const [editInformations, setEditInformations] = useState(false)
 

  useEffect(() => {
    async function load() {
      if(searchParams){
        const nameStore = searchParams.nameStore.replaceAll("-", " ")
        const result = await StoreController.getStoreByWeb(nameStore)
        console.log("🚀 ~ load ~ result:", result)
      }
    }
    load()
    // router.push("not-found")
  }, [])

  return (
    <main className="flex flex-col items-center">
     
    </main>
  )
}
export default Store