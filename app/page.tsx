"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const router = useRouter()
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push("i2/home")
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