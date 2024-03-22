'use client'
import { Card } from "@/components/ui/card"
import { StoreController } from "@/controller/StoreController"
import { IStore } from "@/interface/IStore"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import StoreInformations from "./components/StoreInformations"
import { Libraries, useJsApiLoader } from "@react-google-maps/api"
import { AddressController } from "@/controller/AddressController"
import { IAddress } from "@/interface/IAddress"
import EditInformations from "./components/EditInformations"
import { ManagerController } from "@/controller/ManagerController"
import { IManager } from "@/interface/IManager"
import { Toaster } from "@/components/ui/toaster"

const libraries = ["places"] as Libraries
const Store = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCDFa_2A-YENs-9evzihyQB8ELJGpYsavA',
    libraries,
  });
  const searchParams = useParams<{ idStore: string }>()

  const [editInformations, setEditInformations] = useState(false)
  const [store, setStore] = useState<IStore>()
  const [address, setAddress] = useState<IAddress>()
  const [manager, setManager] = useState<IManager>()
  const company = useCurrentCompany()

  useEffect(() => {
    async function load() {
      const storeResp = await StoreController.get(searchParams.idStore)
      const addressResp = await AddressController.getByStoreId(searchParams.idStore)
      if (storeResp && addressResp) {
        setStore(storeResp)
        setAddress(addressResp)
        const manager = await ManagerController.getByStoreId(storeResp.id)
        if (manager) {
          setManager(manager)
        }
      }
    }
    load()
  }, [])

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-[70rem] my-10">
        {store && company && address && manager &&
          <div>
            <Card className="px-8 py-6">
              {isLoaded &&
                editInformations ?
                <EditInformations manager={manager} address={address} company={company} store={store} setEditInformations={setEditInformations} />
                :
                <StoreInformations address={address} company={company} store={store} setEditInformations={setEditInformations} />
              }
            </Card>
          </div>
        }
      </div>
      <Toaster />
    </main>
  )
}
export default Store