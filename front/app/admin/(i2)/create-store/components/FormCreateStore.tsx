import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ManagerController } from "@/controller/ManagerController"
import { StoreController } from "@/controller/StoreController"
import { ViaCepController } from "@/controller/ViaCepController"
import { IAddress } from "@/interface/IAddress"
import { ICompany } from "@/interface/ICompany"
import { IManager } from "@/interface/IManager"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import { IStore } from "@/interface/IStore"
import { useUpdateCurrentCompany } from "@/state/hooks/useUpdateCurrentCompany"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { v4 as uuid } from "uuid"
interface FormCreateStoreProps {
  company: ICompany
}

type inputInformation = "nameStore" | "cep" | "uf" | "city" | "street" | "neighborhood" | "number"
type inputAccess = "email" | "password"

const FormCreateStore = ({ company }: FormCreateStoreProps) => {
  const setCompany = useUpdateCurrentCompany()

  const router = useRouter()
  const { toast } = useToast()

  const formInformationSchema = z.object({
    nameStore: z.string().startsWith(company.name, "O nome da empresa não pode ser retirado do início!")
      .refine(val => val.trim() !== company.name, "O nome da loja tem que ser diferente do nome da empresa!"),
    cep: z.string().length(8, "O cep deve conter 8 dígitos"),
    uf: z.string(),
    city: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    number: z.string().min(1, "O número é obrigatório!"),
    email: z.string().min(1, "O email é obrigatório!").email("Email inválido!"),
    password: z.string().min(1, "A senha é obrigatória!"),
  })
  const formInformation = useForm<z.infer<typeof formInformationSchema>>({
    resolver: zodResolver(formInformationSchema),
    defaultValues: {
      nameStore: company.name + "teste",
      cep: "76820622",
      uf: "",
      city: "",
      street: "",
      neighborhood: "",
      number: "1234",
      email: "guimota@gmail.com",
      password: "1234",
    },
  })

  async function showToastError(description: string, title?: string) {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    })
  }

  async function onBlurCep(value: string) {
    function checkCep() {
      const regex = /^\d{8}$/
      if (regex.test(value)) {
        formInformation.clearErrors("cep")
        return true
      }
      formInformation.setError("cep", { message: "O CEP está inválido!" })
      return false
    }
    const result = checkCep()
    if (!result) {
      return
    }
    const information = await ViaCepController.getInformations(value)
    if (information) {
      formInformation.setValue("uf", information.uf)
      formInformation.setValue("city", information.localidade)
      formInformation.setValue("street", information.logradouro)
      formInformation.setValue("neighborhood", information.bairro)
    }
  }

  async function onSubmit(values: z.infer<typeof formInformationSchema>) {

    const newAddress = {
      cep: values.cep, city: values.city, neighborhood: values.neighborhood, number: values.number, street: values.street, uf: values.uf
    } as IAddress
    const newStore = {
      id: uuid(),
      companyId: company.id,
      name: values.nameStore.trim(),
      revenue: { cash: 1000 } as IRevenueStore,
      stock: {} as IStockStore,
    } as IStore
    const resultStore = await StoreController.post(newStore, newAddress)
    if (resultStore.resp !== "Success") {
      showToastError(resultStore.resp)
      return
    }

    const newManager = {
      storeId: resultStore.data!.id,
      email: values.email,
      password: values.password,
    } as IManager
    const resultManager = await ManagerController.post(newManager)

    if (resultManager.resp !== "Success") {
      showToastError(resultManager.resp)
      await StoreController.delete(resultStore.data!.name)
      return
    }
    if (resultManager.resp) {
      if (!company.storeId) {
        //adiciona primeiro storeId para a empresa
        setCompany({ ...company, storeId: resultStore.data!.id })
      }
      router.push("./stores")
    }
  }

  const inputsForm = [
    {
      id: "nameStore",
      label: "Nome da Loja",
      style: "col-span-2"
    }, {
      id: "cep",
      label: "CEP",
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
  ] as { id: inputInformation, erro?: string, regex?: string, label?: string, style?: string, onBlur?: (value: string) => Promise<void>, readOnly?: boolean }[]
  const inputAccess = [
    {
      id: "email",
      label: "Email",
      style: "w-96"
    }, {
      id: "password",
      label: "Senha",
    },
  ] as { id: inputAccess, label: string, style?: string, onBlur?: () => void }[]



  return (
    <FormProvider {...formInformation}>
      <form onSubmit={formInformation.handleSubmit(onSubmit)} className="space-y-7 w-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Informações</h3>
          <div className="grid grid-cols-[auto_1fr_1fr] gap-x-7 gap-y-3">

            {inputsForm.map(input =>
              <div key={input.id} className={`${input.style} self-start`}>
                <FormField
                  control={formInformation.control}
                  name={input.id}
                  render={({ field: { onBlur, ...field } }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      <FormControl>
                        <Input
                          onBlur={event => input.onBlur && input.onBlur(event.target.value)}
                          pattern={input.regex}
                          readOnly={input.readOnly}
                          className={`${input.readOnly && "opacity-60"}`}
                          {...field} />
                      </FormControl>
                      <FormMessage>{input.erro}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* {inputsForm.map(input =>
              <div key={input.id} className={`${input.readOnly ? " opacity-60" : ""} ${input.style}`}>
                <Label>{input.label}</Label>
                <Input
                  onBlur={event => input.onBlur ? input.onBlur(event.target.value) : ""}
                  onChange={event => handleInputs(input.id, event.target.value)}
                  readOnly={input.readOnly}
                  value={input.value} />
                <p></p>
              </div>
            )} */}

          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Acesso à Loja</h3>
          <div className="flex gap-5">

            {inputAccess.map(input =>
              <div key={input.id} className={`${input.style} self-starts`}>
                <FormField
                  control={formInformation.control}
                  name={input.id}
                  render={({ field: { onBlur, ...field } }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      <FormControl>
                        <Input onBlur={input.onBlur}  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* {inputAccess.map(input =>
              <div key={input.id} className={input.style}>
                <Label>{input.label}</Label>
                <Input value={input.value} type={`${input.id === "password" ? "password" : ""}`} />
                <p></p>
              </div>
            )} */}

          </div>
        </div>
        <Button className="w-28" type="submit">Criar Loja</Button>
      </form>
    </FormProvider>
  )
}

export default FormCreateStore