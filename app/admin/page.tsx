"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { AuthController } from "@/controller/AuthController";
import { messageTokenService } from "@/interface/IResponseTokenService";
import { useUpdateCurrentOwner } from "@/state/hooks/useUpdateCurrentOwner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type formFields = "email" | "password"

export default function Login() {
  const router = useRouter()
  const setCurrentOwner = useUpdateCurrentOwner()
  const [errorLogin, setErrorLogin] = useState<string>()
  const [errorUrl, setErrorUrl] = useState<{ title: string, desc: string }>()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get("erro") as messageTokenService
    if (error) {
      handleError(error)
    }
  }, [])

  const formSchema = z.object({
    email: z.string().min(1, "Email é obrigatório.").email("Email inválido."),
    password: z.string().min(1, "Senha é obrigatória."),
  })
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function handleError(error: messageTokenService) {
    if (error === "Não logado") {
      showErrorUrl("Usuário não logado!", "Realize o login para poder entrar.")
    } else if (error === "Sessão expirada") {
      showErrorUrl("Sessão expirada!", "Realize o login novamente para entrar.")
    }
  }
  function showErrorUrl(title: string, desc: string) {
    setErrorUrl({ title, desc })
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const auth = await AuthController.loginAdmin(values.email, values.password)
    if (auth.resp === "Success") {
      setCurrentOwner(auth.owner!)
      setErrorUrl(undefined)
      router.push("./admin/stores")
    } else {
      setErrorLogin(auth.resp)
    }
  }

  function handleChanges(event: ChangeEvent<HTMLInputElement>, type: formFields) {
    const value = event.target.value
    form.setValue(type, value)
    form.clearErrors(type)
    setErrorLogin(undefined)
  }

  const formInputs = [
    {
      name: "email",
      label: "Email",
      placeholder: "Digite seu email",
    }, {
      name: "password",
      label: "Senha",
      placeholder: "Digite sua senha",
      isPassword: true
    },
  ] as { name: formFields, label: string, placeholder: string, isPassword: boolean }[]

  return (
    <main className="flex justify-between h-screen">
      <Toaster />
      <div className="hidden md:flex items-center justify-center">
        <div className="h-full w-full bg-[#e0475e] absolute opacity-90"></div>
        <img src="/assets/IceCenterLogo1.png" alt="" className="max-h-screen z-10 max-w-[50rem] w-full p-10" />
      </div>
      <div className="flex flex-col items-center w-full h-full md:max-w-[32rem] min-w-[24rem] py-3 z-10 bg-white justify-center md:shadow-lg  flex-1">
        <div className="flex items-center  w-full h-full px-10 md:px-6">
          <div className="flex flex-col gap-4 w-full">
            {errorUrl &&
              <div className="w-full">
                <Alert variant={"destructive"}>
                  <AlertTitle>{errorUrl.title}</AlertTitle>
                  <AlertDescription>
                    {errorUrl.desc}
                  </AlertDescription>
                </Alert>
              </div>
            }
            <div className="flex flex-col items-center gap-4">
              <h1 className="md:hidden text-2xl font-semibold">IceCenter</h1>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold">Login - Admin</h2>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FormProvider  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">

                  {formInputs.map(input =>
                    <FormField
                      key={input.name}
                      control={form.control}
                      name={input.name}
                      render={({ field: { onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>{input.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={input.placeholder} type={input.isPassword ? "password" : "text"} onChange={event => handleChanges(event, input.name)} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {errorLogin && <Label className="text-sm font-medium text-red-600 ">{errorLogin}</Label>}
                  <Button className="w-full" type="submit">Entrar</Button>
                </form>
              </FormProvider >
              <Label className="">ou</Label>
              <Link href={"./admin/createCompany"} className="text-sm w-full"><Button variant={"outline"} className="w-full">Criar nova empresa</Button></Link>
            </div>

            <Link href={"/manager"}><Button variant={"link"}>Ir para login de gerentes</Button></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
