"use client"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ICompany } from "@/interface/ICompany"
import { IStore } from "@/interface/IStore"
import { Dispatch, SetStateAction, useState } from "react"
import GoogleMaps from "./GoogleMaps"
import Link from "next/link"
import { toast as toastCopy } from "sonner"
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { IAddress } from "@/interface/IAddress"
import { MdModeEdit } from "react-icons/md";
import { IManager } from "@/interface/IManager"
import { MdDelete } from "react-icons/md";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { StoreController } from "@/controller/StoreController"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { TbWorldShare } from "react-icons/tb";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"


interface StoreInformationsProps {
  company: ICompany
  store: IStore
  manager: IManager
  address: IAddress
  setEditInformations: Dispatch<SetStateAction<boolean>>
}

const StoreInformations = ({ company, manager, store, address, setEditInformations }: StoreInformationsProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const addressString = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.uf}, Brasil`
  const [openMap, setOpenMap] = useState(false)
  const [position, setPosition] = useState({ lat: 0, lng: 0 })

  function editInformations() {
    setEditInformations(true)
  }
  function showAlert(description: string, title?: string) {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    })
  }

  async function deleteStore() {
    const resp = await StoreController.delete(store.id)
    if (resp.resp === "Success") {
      return router.push("/admin/stores")
    }
    showAlert(resp.resp)
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
    toastCopy(`${title}`, {
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
      label: "Nome da Loja",
      value: store.name
    }, {
      label: "Slug",
      value: store.slug
    }, {
      label: "Email de Acesso",
      value: manager.email
    }, {
      label: "Id da Loja",
      value: store.id
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
      <div className="flex flex-col gap-10">
        <div className="space-y-5">

          <div className="flex w-full gap-4">
            <h2 className="text-lg sm:text-xl font-semibold">Informações</h2>
            <div className="flex justify-between items-center w-full">

              <div className="flex gap-3">
                <Button
                  size={"sm"}
                  onClick={editInformations}
                  className="space-x-2">
                  <MdModeEdit className="text-lg" />
                  <p className="hidden sm:block">Editar Informações</p>
                </Button>
                {store.isOpen ?
                  <Link href={`/${store.slug}`} target="_blank">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="space-x-2">
                      <TbWorldShare className="text-xl" />
                      <p className="hidden sm:block">Acessar na Web</p>
                    </Button>
                  </Link>
                  :
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "space-x-2")}>
                        <TbWorldShare className="text-xl" />
                        <p className="hidden sm:block">Acessar na Web</p>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Abra a loja pelo login de gerente para acessar</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                }
              </div>

              <AlertDialog>
                <AlertDialogTrigger className={cn(buttonVariants({ variant: "destructive", size: "sm" }), "space-x-2")}>
                  <MdDelete className="text-lg" />
                  <p className="hidden sm:block">Excluir loja</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ao clicar em excluir, não será possível reverter a ação!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteStore} className="bg-red-600 hover:bg-red-500">Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-x-7 gap-y-3">
            {importantInformations.map(info =>
              <div key={info.label} className="flex flex-col gap-1">
                <Label>{info.label}</Label>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant={"outline"}
                        onClick={event => handleCopy(`${info.label} Copiado!`, `${info.label} salvo na sua área de transferência.`, info.value)}
                        className="self-start text-sm cursor-pointer hover:shadow-sm">
                        <p>{info.value}</p>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Clique para copiar o valor</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-semibold">Localização</h2>
            <Button size={"sm"} onClick={handleMap} className="self-start space-x-2">
              <FaMapLocationDot className="text-lg" />
              <p className="hidden sm:block">{openMap ? "Fechar mapa" : "Abrir mapa"}</p>
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={event => handleCopy("Endereço Copiado!", "Endereço salvo na sua área de transferência.", addressString)}
              className="self-start space-x-2">
              <MdContentCopy className="text-lg" />
              <p className="hidden sm:block">Copiar endereço</p>
            </Button>
          </div>

          <div className="flex flex-wrap justify-between gap-x-7 gap-y-4">
            {inputsForm.map(input =>
              <div key={input.label} className="flex flex-col">
                <div >
                  <Label htmlFor={input.label}>{input.label}</Label>
                </div>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        id={input.label}
                        variant={"outline"}
                        onClick={event => handleCopy(`${input.label} Copiado!`, `${input.label} salvo na sua área de transferência.`, input.value)}
                        className="flex items-center gap-2 self-start text-sm cursor-pointer hover:shadow-sm">
                        <p>{input.value}</p>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Clique para copiar o valor</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

        </div>
      </div>
      {
        openMap ?
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

    </div >
  )
}

export default StoreInformations