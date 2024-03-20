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

export default function Login() {
  const router = useRouter()
  const setManager = useUpdateCurrentManager()
  const formSchema = z.object({
    // email: z.string().min(2).max(50),
    // password: z.string().min(4).max(30)
    idStore: z.string(),
    email: z.string(),
    password: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idStore: "sorvetes-mais-centro",
      email: "sorvetescentro@gmail.com",
      password: "1234"
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const manager = await ManagerController.getByIdStore(values.idStore)
    if (manager) {
      const result = await AuthController.loginUser(values.email, values.password, manager)
      if (result) {
        setManager(manager)
        router.push("store")
      } 
    }
  }

  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-[30rem] w-full">
        <div className="mb-3">
          <h1 className="text-xl font-semibold">IceCenter</h1>
        </div>
        <Card className="w-full">

          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-xl">Login</CardTitle>
          </CardHeader>

          <CardContent>
            <div>
              <FormProvider  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                  <FormField
                    control={form.control}
                    name="idStore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Id loja</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o id da loja" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
          </CardContent>

        </Card>
      </div>
    </main>
  );
}
