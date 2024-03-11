"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { StoreController } from "@/controller/StoreController"
import { IStore } from "@/interface/IStore"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

const CreateStores = () => {
  const company = useCurrentCompany()
  const [stores, setStores] = useState<IStore[]>()

  useEffect(() => {
    async function load() {
      setStores(
        await StoreController.findByCompany(company.id)
      )
    }
    if (company) {
      load()
    }
  }, [company])

  const formSchema = z.object({
    // email: z.string().min(2).max(50),
    // password: z.string().min(4).max(30)
    email: z.string(),
    password: z.string()
  })
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // router.push("admin/i2/home")
  }
  return (
    <main className="flex flex-col items-center w-full h-screen">
      <div className="w-full flex flex-col items-center mt-10 max-w-[70rem]">
        <div className="flex flex-col w-full gap-5">
          <h1 className="text-xl font-medium">Criar Loja</h1>
          <div className="grid grid-cols-2 gap-x-10">
            <Card className="w-full p-6">
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
                            <Input placeholder="Digite sua senha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="w-full" type="submit">Entrar</Button>
                  </form>
                </FormProvider >
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CreateStores