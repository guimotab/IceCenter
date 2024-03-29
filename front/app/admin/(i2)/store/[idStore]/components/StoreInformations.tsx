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
import { IManager } from "@/interface/IManager"

interface StoreInformationsProps {
  company: ICompany
  store: IStore
  manager: IManager
  address: IAddress
  setEditInformations: Dispatch<SetStateAction<boolean>>
}

const StoreInformations = ({ company, manager, store, address, setEditInformations }: StoreInformationsProps) => {

  const addressString = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.uf}, Brasil`
  const [openMap, setOpenMap] = useState(false)
  const [position, setPosition] = useState({ lat: 0, lng: 0 })

  function editInformations() {
    setEditInformations(true)
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

  const importantInformations = [
    {
      label: "Nome da Empresa",
      value: company.name
    }, {
      label: "Nome da Loja",
      value: store.name
    }, {
      label: "Id da Loja",
      value: store.id
    },{
      label: "Email de Acesso",
      value: manager.email
    }
  ] as { label: string, value: string }[]
  const inputsForm = [
    {
      label: "CEP",
      value: address.cep
    }, {
      label: "UF",
      value: address.uf
    }, {
      label: "Cidade",
      value: address.city
    }, {
      label: "Rua",
      value: address.street
    }, {
      label: "Bairro",
      value: address.neighborhood
    }, {
      label: "Número",
      value: address.number
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <div className="flex w-full justify-between">
            <h2 className="text-xl font-semibold">Informações</h2>
            <Button
              size={"sm"}
              onClick={editInformations}
              className="space-x-2">
              <MdModeEdit className="text-lg" />
              <p>Editar Informações</p>
            </Button>
          </div>

          <div className="grid grid-cols-[auto_auto_auto_auto] gap-x-7 gap-y-3">
            {importantInformations.map(info =>
              <div key={info.label} className="flex flex-col gap-1">
                <Label>{info.label}</Label>
                <Badge
                  variant={"outline"}
                  onClick={event => handleCopy(`${info.label} Copiado!`, `${info.label} salvo na sua área de transferência.`, info.value)}
                  className="flex items-center gap-2 self-start text-sm cursor-pointer hover:shadow-sm">
                  <p>{info.value}</p>
                  <MdContentCopy className="text-lg" />
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Localização</h2>
            <Button
              size={"sm"}
              onClick={event => handleCopy("Endereço Copiado!", "Endereço salvo na sua área de transferência.", addressString)}
              className="self-start space-x-2">
              <MdContentCopy className="text-lg" />
              <p>Copiar endereço</p>
            </Button>

            <Button size={"sm"} onClick={handleMap} className="self-start space-x-2">
              <FaMapLocationDot className="text-lg" />
              <p>{openMap ? "Fechar mapa" : "Abrir mapa"}</p>
            </Button>
          </div>

          <div className="grid grid-cols-[auto_auto_auto] gap-x-7 gap-y-4">
            {inputsForm.map(input =>
              <div key={input.label} className="flex flex-col gap-1">
                <Label>{input.label}</Label>
                <Badge
                  variant={"outline"}
                  onClick={event => handleCopy(`${input.label} Copiado!`, `${input.label} salvo na sua área de transferência.`, input.value)}
                  className="flex items-center gap-2 self-start text-sm cursor-pointer hover:shadow-sm">
                  <p>{input.value}</p>
                  <MdContentCopy className="text-lg" />

                </Badge>
              </div>
            )}
          </div>

        </div>
      </div>
      {openMap ?
        <>
          <div className="w-full h-[30rem] border-2">
            <GoogleMaps startingPosition={position} address={address} />
          </div>
          <Link href={`https://www.google.com.br/maps/@${position.lat},${position.lng},20z?`} target="_blank">
            <Button className="space-x-2">
              <FaMapMarkerAlt />
              <p>Abrir endereço no maps</p>
            </Button>
          </Link>
        </>
        : ""
      }

    </div>
  )
}

export default StoreInformations