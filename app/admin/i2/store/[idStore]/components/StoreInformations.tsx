"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ICompany } from "@/interface/ICompany"
import { IStore } from "@/interface/IStore"
import { useState } from "react"
import GoogleMaps from "./GoogleMaps"

interface StoreInformationsProps {
  company: ICompany
  store: IStore
}
const StoreInformations = ({ company, store }: StoreInformationsProps) => {

  const [openMap, setOpenMap] = useState(true)
  function handleMap() {
    setOpenMap(!openMap)
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
    },
  ]
  const inputsForm = [
    {
      label: "CEP",
      value: store.address.cep
    }, {
      label: "UF",
      value: store.address.uf
    }, {
      label: "Cidade",
      value: store.address.city
    }, {
      label: "Rua",
      value: store.address.street
    }, {
      label: "Bairro",
      value: store.address.neighborhood
    }, {
      label: "Número",
      value: store.address.number
    },
  ]
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Informações</h2>

          <div className="grid grid-cols-3 gap-x-7 gap-y-3">
            {importantInformations.map(info =>
              <div className="flex flex-col gap-1">
                <Label>{info.label}</Label>
                <Badge variant={"outline"} className="self-start text-sm">{info.value}</Badge>
              </div>
            )}

          </div>
        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Localização</h2>
            <Button size={"sm"} onClick={handleMap} className="self-start">{openMap ? "Fechar Mapa" : "Abrir Mapa"}</Button>
          </div>

          <div className="grid grid-cols-3 gap-x-7 gap-y-4">
            {inputsForm.map(input =>
              <div key={input.label} className="flex flex-col gap-1">
                <Label>{input.label}</Label>
                <Badge variant={"outline"} className="self-start text-sm">{input.value}</Badge>
              </div>
            )}
          </div>

        </div>

      </div>

      {openMap ?
        <div className="w-full h-[30rem] border-2">
          <GoogleMaps address={store.address} />
        </div>
        : ""
      }

    </div>
  )
}

export default StoreInformations