"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { AuthController } from "@/controller/AuthController";
import { useUpdateCurrentOwner } from "@/state/hooks/useUpdateCurrentOwner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
type formFields = "email" | "password" | "nameCompany" | "repeatPassword"

export default function SignIn() {
  const router = useRouter()
  const setCurrentOwner = useUpdateCurrentOwner()
  const [errorLogin, setErrorLogin] = useState<string>()

  const formSchema = z.object({
    nameCompany: z.string().min(1, "Nome da empresa é obrigatório."),
    email: z.string().min(1, "Email é obrigatório.").email("Email inválido."),
    password: z.string().min(1, "Senha é obrigatória."),
    repeatPassword: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameCompany: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const passwordMatch = checkPasswords()
    if (!passwordMatch) {
      return
    }
    const auth = await AuthController.createCompany(values.nameCompany, values.email, values.password)
    if (auth.resp === "Success") {
      setCurrentOwner(auth.owner)
      router.push("./stores")
    } else {
      setErrorLogin(auth.resp)
    }
  }

  function checkPasswords() {
    const password = form.getValues("password")
    const confirmPassword = form.getValues("repeatPassword")
    if (password !== confirmPassword) {
      form.setError("password", { message: "As senhas não conferem!" })
      form.setError("repeatPassword", { message: "" })
      return false
    }
    return true
  }

  function handleChanges(event: ChangeEvent<HTMLInputElement>, type: formFields) {
    const value = event.target.value
    form.setValue(type, value)
    if (type === "password") {
      form.clearErrors("repeatPassword")
    }
    form.clearErrors(type)
    setErrorLogin(undefined)
  }

  const formInputs = [
    {
      name: "nameCompany",
      label: "Nome da Empresa",
      placeholder: "Digite o nome",
    }, {
      name: "email",
      label: "Email",
      placeholder: "Digite seu email",
    }, {
      name: "password",
      label: "Senha",
      placeholder: "Digite sua senha",
      isPassword: true
    }, {
      name: "repeatPassword",
      label: "Repita a senha",
      placeholder: "Repita sua senha",
      isPassword: true
    },
  ] as { name: formFields, label: string, placeholder: string, isPassword?: boolean }[]

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
                            <Input type={input.isPassword ? "password" : "text"} placeholder={input.placeholder} onChange={event => handleChanges(event, input.name)} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {errorLogin && <Label className="text-sm font-medium text-red-600 ">{errorLogin}</Label>}
                  <Button className="w-full" type="submit">Criar nova empresa</Button>
                </form>
              </FormProvider >
              <Label className="">ou</Label>
              <Link href={"/admin"} className="text-sm w-full"><Button variant={"outline"} className="w-full">Logar</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}
