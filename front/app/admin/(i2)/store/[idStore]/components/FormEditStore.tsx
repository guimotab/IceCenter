import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { AddressController } from "@/controller/AddressController"
import { ManagerController } from "@/controller/ManagerController"
import { StoreController } from "@/controller/StoreController"
import { ViaCepController } from "@/controller/ViaCepController"
import { IAddress } from "@/interface/IAddress"
import { ICompany } from "@/interface/ICompany"
import { IManager } from "@/interface/IManager"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import { IStore } from "@/interface/IStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"
import { z } from "zod"

interface FormEditStoreProps {
  manager: IManager
  store: IStore
  company: ICompany
  address: IAddress
  closeEdit: () => void
}

type inputInformation = "nameStore" | "cep" | "uf" | "city" | "street" | "neighborhood" | "number"
type inputAccess = "email" | "newPassword" | "repeatNewPassword"

const FormEditStore = ({ manager, store, address, company, closeEdit }: FormEditStoreProps) => {

  const router = useRouter()
  const { toast } = useToast()

  const [nameStore, setNameStore] = useState(store.name.replace(company.name, "").trim())
  const [cep, setCep] = useState(address.cep)
  const [uf, setUf] = useState(address.uf)
  const [city, setCity] = useState(address.city)
  const [street, setStreet] = useState(address.street)
  const [neighborhood, setNeighborhood] = useState(address.neighborhood)
  const [number, setNumber] = useState(address.number)
  const [email, setEmail] = useState(manager.email)
  const [newPassword, setNewPassword] = useState("")
  const [repeatNewPassword, setRepeatNewPassword] = useState("")

  const formAccessSchema = z.object({
    email: z.string().min(1, "O email não pode ser nulo!"),
    newPassword: z.string().optional(),
    repeatNewPassword: z.string().optional(),
  }).refine((data) => {
    if (data.newPassword !== "") {
      if (data.newPassword !== data.repeatNewPassword) {
        return {
          message: "As senhas não conferem",
          path: ["repeatNewPassword"]
        }
      }
    }
  });

  const formAccess = useForm<z.infer<typeof formAccessSchema>>({
    resolver: zodResolver(formAccessSchema),
    defaultValues: {
      email: manager.email,
    },
  })

  const formInformationSchema = z.object({
    nameStore: z.string().min(1, "O nome não pode ser nulo!"),
    cep: z.string().length(8, "O cep deve conter 8 dígitos"),
    uf: z.string().min(1, "O uf não pode ser nulo!"),
    city: z.string().min(1, "A cidade não pode ser nulo!"),
    street: z.string().min(1, "A rua não pode ser nulo!"),
    neighborhood: z.string().min(1, "O bairro não pode ser nulo!"),
    number: z.string().min(1, "O número não pode ser nulo!"),
  })
  const formInformation = useForm<z.infer<typeof formInformationSchema>>({
    resolver: zodResolver(formInformationSchema),
    defaultValues: {
      nameStore: store.name.replace(company.name, "").trim(),
      cep: address.cep,
      uf: address.uf,
      city: address.city,
      street: address.street,
      neighborhood: address.neighborhood,
      number: address.number,
    },
  })

  // function handleInputs(type: string, value: string) {
  //   if (type === "nameStore") {
  //     setNameStore(value)
  //   } else if (type === "cep") {
  //     setCep(value)
  //   } else if (type === "number") {
  //     setNumber(value)
  //   } else if (type === "email") {
  //     setEmail(value)
  //   } else if (type === "newPassord") {
  //     setNewPassword(value)
  //   } else if (type === "repeatNewPassord") {
  //     setRepeatNewPassword(value)
  //   }
  // }

  async function onBlurCep(value: string) {
    const information = await ViaCepController.getInformations(value)
    if (information) {
      setUf(information.uf)
      setCity(information.localidade)
      setStreet(information.logradouro)
      setNeighborhood(information.bairro)
    }
  }

  async function onSubmit(values: z.infer<typeof formInformationSchema>) {

    const canSubmit = verifyForm(values)

    // if (canSubmit) {
    //   showError(canSubmit.error.description, canSubmit.error.title)
    //   return
    // }

    const newAddress = {
      cep, city, neighborhood, number, street, uf
    } as IAddress

    const newStore = {
      ...store,
      name: `${company.name} ${nameStore.trim()}`,
    } as IStore

    const newManager = {
      ...manager,
      email: email,
      password: newPassword,
    } as IManager

    // const [resultStore, resultAddress, resultManager] = await Promise.all([
    //   StoreController.put(store.id, newStore),
    //   AddressController.put(store.id, newAddress),
    //   ManagerController.put(manager.id, newManager)
    // ])

    // if (resultStore.resp !== "Sucess" && resultAddress.resp !== "Sucess" && resultManager.resp !== "Sucess") {
    //   return
    // }

    // closeEdit()
  }

  function verifyForm(values: z.infer<typeof formInformationSchema>) {
    let title: string | undefined
    let description = ""
    let status = false

    return { status, error: { title, description } }
  }

  function showError(description: string, title?: string) {
    toast({
      title,
      description,
      variant: "destructive"
    })
  }

  const inputsForm = [
    {
      id: "nameStore",
      style: " mt-6",
    }, {
      id: "cep",
      label: "CEP",
      regex: "/(\d+)| /g",
      onBlur: onBlurCep
    }, {
      id: "uf",
      label: "UF",
      readOnly: true,
      style: "w-32"
    }, {
      id: "city",
      label: "Cidade",
      readOnly: true,
    }, {
      id: "street",
      label: "Rua",
      readOnly: true,
    }, {
      id: "neighborhood",
      label: "Bairro",
      readOnly: true,
      style: "col-span-2"
    }, {
      id: "number",
      label: "Número",
      style: "w-40"
    }
  ] as { id: inputInformation, regex?: string, label?: string, style?: string, onBlur?: (value: string) => Promise<void>, readOnly?: boolean }[]

  const inputAccess = [
    {
      id: "email",
      label: "Email",
      style: "w-96"
    }, {
      id: "newPassord",
      label: "Nova Senha",
    }, {
      id: "repeatNewPassword",
      label: "Repetir Nova Senha",
    },
  ] as { id: inputAccess, label: string, style?: string }[]

  return (
    <>
      <FormProvider {...formInformation}>
        <form onSubmit={formInformation.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Informações</h3>
            <div className="grid grid-cols-[auto_1fr_1fr] gap-x-7 gap-y-3">
              <div className="mt-2 self-start">
                <Label>{"Nome da Loja"}</Label>
                <div className="relative flex gap-4 items-center ">
                  <Input value={company.name} readOnly className="w-fit opacity-60" />
                  <p className="absolute -right-5 text-lg font-medium">+</p>
                </div>
              </div>

              {inputsForm.map(input =>
                <div key={input.id} className={`${input.style} self-start`}>
                  <FormField
                    control={formInformation.control}
                    name={input.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <FormControl>
                          <Input pattern={input.regex} readOnly={input.readOnly} placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Acesso</h3>
            <div className="flex gap-5">

              {inputAccess.map(input =>
                <div key={input.id} className={`${input.style} self-end`}>
                  <FormField
                    control={formAccess.control}
                    name={input.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

            </div>
          </div>
      <div className="flex justify-between items-center">
        <Button type="submit">Concluir Alterações</Button>
        <Button onClick={closeEdit} variant={"outline"}>Cancelar</Button>
      </div>
        </form>
      </FormProvider>
    </>
  )
}

export default FormEditStore