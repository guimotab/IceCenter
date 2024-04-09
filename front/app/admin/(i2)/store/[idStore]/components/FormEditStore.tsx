import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { AddressController } from "@/controller/AddressController"
import { ManagerController } from "@/controller/ManagerController"
import { StoreController } from "@/controller/StoreController"
import { ViaCepController } from "@/controller/ViaCepController"
import { IAddress } from "@/interface/IAddress"
import { ICompany } from "@/interface/ICompany"
import { IManager } from "@/interface/IManager"
import { IStore } from "@/interface/IStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
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
    newPassword: z.string(),
    repeatNewPassword: z.string(),
  })
  const formInformation = useForm<z.infer<typeof formInformationSchema>>({
    resolver: zodResolver(formInformationSchema),
    defaultValues: {
      nameStore: store.name,
      cep: address.cep,
      uf: address.uf,
      city: address.city,
      street: address.street,
      neighborhood: address.neighborhood,
      number: address.number,
      email: manager.email,
      newPassword: "",
      repeatNewPassword: "",
    },
  })

  async function handleCep(value: string) {
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
    function verifyPasswords() {
      formInformation.clearErrors(["newPassword", "repeatNewPassword"])
      if (values.newPassword !== "" || values.repeatNewPassword === values.newPassword) {
        return true
      }
      if (values.repeatNewPassword === "") {
        formInformation.setError("repeatNewPassword", { message: "Repita a senha novamente" })
        return false
      }
      formInformation.setError("newPassword", { message: "As senhas não conferem" })
      formInformation.setError("repeatNewPassword", { message: "" })
      return false
    }
    const result = verifyPasswords()
    if (!result) {
      return
    }
    const newStore = {
      ...store,
      slug: values.nameStore.trim().toLocaleLowerCase().replaceAll(" " , "-"),
      name: values.nameStore.trim(),
    } as IStore

    const newAddress = {
      cep: values.cep, city: values.city, neighborhood: values.neighborhood, number: values.number, street: values.street, uf: values.uf
    } as IAddress

    const newManager = {
      ...manager,
      email: values.email,
      password: values.newPassword !== "" ? values.newPassword : manager.password,
    } as IManager

    const [resultStore, resultAddress, resultManager] = await Promise.all([
      StoreController.put(store.id, newStore),
      AddressController.put(address.id, newAddress),
      ManagerController.put(manager.id, newManager)
    ])
    
    if (resultStore.resp !== "Success") {
      showToastError(resultStore.resp)
      return
    } else if (resultAddress.resp !== "Success") {
      showToastError(resultAddress.resp)
      return
    } else if (resultManager.resp !== "Success") {
      showToastError(resultManager.resp)
      return
    }

    closeEdit()
  }

  async function showToastError(description: string, title?: string) {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    })
  }

  function onBlurRepeatNewPassord() {
    formInformation.clearErrors(["newPassword", "repeatNewPassword"])
    if (formInformation.getValues("repeatNewPassword") !== formInformation.getValues("newPassword")) {
      formInformation.setError("newPassword", { message: "As senhas não conferem" })
      formInformation.setError("repeatNewPassword", { message: "" })
    }
  }

  const inputsForm = [
    {
      id: "nameStore",
      label: "Nome da Loja",
      style: "sm:col-span-2"
    }, {
      id: "cep",
      label: "CEP",
      onBlur: handleCep
    }, {
      id: "uf",
      label: "UF",
      readOnly: true,
      style: "sm:w-32"
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
      style: "sm:col-span-2"
    }, {
      id: "number",
      label: "Número",
      style: "sm:w-40"
    }
  ] as { id: inputInformation, erro?: string, regex?: string, label?: string, style?: string, onBlur?: (value: string) => Promise<void>, readOnly?: boolean }[]

  const inputAccess = [
    {
      id: "email",
      label: "Email",
      style: "w-96",
      showInput: true
    }, {
      id: "newPassword",
      label: "Nova Senha",
      showInput: true,
      isPassword: true,
    }, {
      id: "repeatNewPassword",
      label: "Repetir Nova Senha",
      onBlur: onBlurRepeatNewPassord,
      isPassword: true,
    },
  ] as { id: inputAccess, label: string, style?: string, onBlur?: () => void, isPassword?: boolean }[]

  return (
    <>
      <FormProvider {...formInformation}>
        <form onSubmit={formInformation.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Informações</h3>
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr] gap-x-7 gap-y-3">

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

            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Acesso à loja</h3>
            <div className="flex flex-wrap gap-5">

              {inputAccess.map(input =>
                <div key={input.id} className={`${input.style} self-starts`}>
                  <FormField
                    control={formInformation.control}
                    name={input.id}
                    render={({ field: { onBlur, ...field } }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <FormControl>
                          <Input type={input.isPassword ? "password" : "text"} onBlur={input.onBlur}  {...field} />
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