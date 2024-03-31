"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ManagerController } from "@/controller/ManagerController";
import { useUpdateCurrentManager } from "@/state/hooks/useUpdateCurrentManager";
import { AuthController } from "@/controller/AuthController";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Login() {
  const router = useRouter()
  const setManager = useUpdateCurrentManager()
  const formSchema = z.object({
    email: z.string().min(1, "Email é obrigatório.").email("Email inválido."),
    password: z.string().min(1, "Senha é obrigatória."),
  })
  const [erroSubmit, setErrorSubmit] = useState<string>()
  const [error, setError] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "centralSorvetes@gmail.com",
      password: "1234"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorSubmit(undefined)
    const result = await AuthController.loginManager(values.email, values.password)
    if (result && result.resp === "Success") {
      setManager(result.manager)
      return router.push("store")
    }
    setErrorSubmit(result.resp)
  }

  return (
    <main className="flex  justify-between h-screen">
      <div className="flex items-center justify-center flex-1">
        <div className="h-full w-full bg-[#e0475e] absolute opacity-90"></div>
        <img src="/assets/IceCenterLogo1.png" alt="" className="max-h-screen z-10 max-w-[50rem] p-10" />
      </div>
      <div className="flex flex-col items-center  w-full h-full max-w-[32rem] py-10 z-10 bg-white shadow-lg">
        <div className="flex items-center  w-full h-full px-10">
          <div className="w-full flex flex-col justify-center h-fit">

            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold">Login</h1>
            </div>

            <div>
              <FormProvider  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Digite sua senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">Entrar</Button>
                  {erroSubmit && <Label className="text-red-500">{erroSubmit}</Label>}

                </form>
              </FormProvider >
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
