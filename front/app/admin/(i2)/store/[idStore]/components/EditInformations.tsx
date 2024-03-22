"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ICompany } from "@/interface/ICompany"
import { IStore } from "@/interface/IStore"
import { Dispatch, SetStateAction, useState } from "react"
import GoogleMaps from "./GoogleMaps"
import Link from "next/link"
import { toast } from "sonner"
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { IAddress } from "@/interface/IAddress"
import { MdModeEdit } from "react-icons/md";
import FormEditStore from "./FormEditStore"
import { IManager } from "@/interface/IManager"

interface EditInformationsProps {
  manager: IManager
  company: ICompany
  store: IStore
  address: IAddress
  setEditInformations: Dispatch<SetStateAction<boolean>>
}

const EditInformations = ({ manager, company, store, address, setEditInformations }: EditInformationsProps) => {

  const addressString = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.uf}, Brasil`
  const [openMap, setOpenMap] = useState(false)
  const [position, setPosition] = useState({ lat: 0, lng: 0 })

  function closeEdit() {
    setEditInformations(false)
  }

  async function handleMap() {
    const geocoder = new google.maps.Geocoder()
    const result = (await geocoder.geocode({ address: addressString })).results[0]
    setPosition({
      lat: result.geometry?.location?.lat(),
      lng: result.geometry?.location?.lng()
    })

    setOpenMap(!openMap)
  }
  async function handleCopy(title: string, desc: string, textToCopy: string) {
    toast(`${title}`, {
      description: `${desc}`,
      action: {
        label: "Entendi",
        onClick: () => ""
      }
    })
    await navigator.clipboard.writeText(textToCopy)
  }

  return (
    <div className="flex flex-col gap-4">
      <FormEditStore manager={manager} store={store} company={company} address={address} closeEdit={closeEdit} />
    </div>
  )
}

export default EditInformations