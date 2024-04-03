"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    const auth = await AuthController.createCompany(values.nameCompany, values.email, values.password)
    if (auth.resp === "Success") {
      setCurrentOwner(auth.owner)
      router.push("./stores")
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
    <main className="flex w-screen min-h-screen flex-col items-center justify-between pt-10">
      <div className="max-w-[30rem] w-full">
        <div className="mb-3">
          <h1 className="text-xl font-semibold">IceCenter</h1>
        </div>
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-xl">Criar Empresa</CardTitle>
          </CardHeader>
          <CardContent className="pb-5">
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

          </CardContent>
          <CardFooter className="pl-3">
            <Link href={"/"}><Button variant={"link"}>Ir para login de usuários</Button></Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
