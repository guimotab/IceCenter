import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ManagerController } from "@/controller/ManagerController"
import { StoreController } from "@/controller/StoreController"
import { ViaCepController } from "@/controller/ViaCepController"
import { ICompany } from "@/interface/ICompany"
import { IManager } from "@/interface/IManager"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import { IStore } from "@/interface/IStore"
import { IAddress } from "@/interface/iAddress"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { v4 as uuid } from 'uuid';
interface FormCreateStoreProps {
  company: ICompany
}
const FormCreateStore = ({ company }: FormCreateStoreProps) => {

  const router = useRouter()

  const [nameStore, setNameStore] = useState("Central")
  const [cep, setCep] = useState("78550130")
  const [uf, setUf] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [number, setNumber] = useState("5500")
  const [email, setEmail] = useState("centralSorvetes@gmail.com")
  const [password, setPassword] = useState("1234")

  function handleInputs(type: string, value: string) {
    if (type === "nameStore") {
      setNameStore(value)
    } else if (type === "cep") {
      setCep(value)
    } else if (type === "number") {
      setNumber(value)
    }
  }

  async function onBlurCep(value: string) {
    const information = await ViaCepController.getInformations(value)
    if (information) {
      setUf(information.uf)
      setCity(information.localidade)
      setStreet(information.logradouro)
      setNeighborhood(information.bairro)
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const idStore = `${company.name} ${nameStore.trim()}`.toLocaleLowerCase().replaceAll(" ", "-")
    const newAddress = {
      cep, city, neighborhood, number, street, uf
    } as IAddress
    const newStore = {
      id: idStore,
      idCompany: company.id,
      name: `${company.name} ${nameStore.trim()}`,
      revenue: {} as IRevenueStore,
      stock: {} as IStockStore,
      address: newAddress,
    } as IStore

    const newManager = {
      idStore: idStore,
      email: email,
      password: password,
    } as IManager

    const [resultStore, resultManager] = await Promise.all([StoreController.createStore(newStore), ManagerController.createManager(newManager)])

    if (resultStore && resultManager) {
      router.push("./home")
    }
  }
  const inputsForm = [
    {
      id: "cep",
      label: "CEP",
      value: cep,
      onBlur: onBlurCep
    }, {
      id: "UF",
      label: "UF",
      value: uf,
      readOnly: true,
      style: "w-32"
    }, {
      id: "city",
      label: "Cidade",
      value: city,
      readOnly: true,
    }, {
      id: "street",
      label: "Rua",
      value: street,
      readOnly: true,
    }, {
      id: "neighborhood",
      label: "Bairro",
      value: neighborhood,
      readOnly: true,
      style: "col-span-2"
    }, {
      id: "number",
      label: "Número",
      value: number,
      style: "w-40"
    }
  ]
  const inputAccess = [
    {
      id: "email",
      label: "Email",
      value: email,
      style: "w-96"
    }, {
      id: "password",
      label: "Senha",
      value: password,
    },
  ]
  return (
    <form onSubmit={onSubmit} className="space-y-7 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Informações</h3>
        <div className="grid grid-cols-[auto_1fr_1fr] gap-x-7 gap-y-3">
          <div className="col-span-2">
            <Label>{"Nome da Loja"}</Label>
            <div className="flex gap-2 items-center">
              <Input value={company.name} readOnly className="w-fit opacity-60" />
              <p className="text-lg font-medium">+</p>
              <Input onChange={event => handleInputs("nameStore", event.target.value)} value={nameStore} />
            </div>
            <p></p>
          </div>
          {inputsForm.map(input =>
            <div key={input.id} className={`${input.readOnly ? " opacity-60" : ""} ${input.style}`}>
              <Label>{input.label}</Label>
              <Input
                onBlur={event => input.onBlur ? input.onBlur(event.target.value) : ""}
                onChange={event => handleInputs(input.id, event.target.value)}
                readOnly={input.readOnly}
                value={input.value} />
              <p></p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Acesso</h3>
        <div className="flex gap-5">
          {inputAccess.map(input =>
            <div key={input.id} className={input.style}>
              <Label>{input.label}</Label>
              <Input value={input.value} type={`${input.id === "password" ? "password" : ""}`} />
              <p></p>
            </div>
          )}
        </div>
      </div>
      <Button className="w-28" type="submit">Criar Loja</Button>
    </form>
  )
}

export default FormCreateStore