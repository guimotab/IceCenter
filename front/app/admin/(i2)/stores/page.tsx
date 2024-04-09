"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { StoreController } from "@/controller/StoreController"
import { IStore } from "@/interface/IStore"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import Link from "next/link"
import { useEffect, useState } from "react"

const Home = () => {
  const company = useCurrentCompany()
  const [stores, setStores] = useState<IStore[]>()

  useEffect(() => {
    async function load() {
      if (company.storeId) {
        const result = await StoreController.findAllByCompanyId(company.id)
        if (result) {
          setStores(result)
        }
      }
    }
    if (company) {
      load()
    }
  }, [company])

  return (
    <main className="flex flex-col items-center w-full px-4">
      <div className="w-full flex flex-col items-center mt-10 max-w-[70rem]">
        <div className="flex flex-col w-full gap-5">
          {company &&
            <div className="flex items-center gap-3">
              <h1 className="text-lg sm:text-xl font-medium">Lojas Atuais</h1>
              <Link href={"./create-store"}>
                <Button className="text-xs px-3 py-1 sm:text-sm sm:px-4 sm:py-2 ">Nova Loja</Button>
              </Link>
            </div>
          }
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            {stores ? stores.map(store =>
              <Card key={store.id}>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">
                    <div className="flex justify-between w-full">
                      <p>{store.name}</p>
                      <div className="flex items-center gap-1">
                        <div className={`${store.isOpen ? "h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" : "h-1.5 w-1.5 rounded-full bg-slate-700"}`} />
                        <p
                          className={`font-medium text-sm`}>
                          {store.isOpen ? "Aberto" : "Fechado"}
                        </p>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {store.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={"./store/" + store.id}>
                    <Button>Ver Loja</Button>
                  </Link>
                </CardContent>
              </Card>
            )
              :
              <Label className="text-lg font-normal">Não há lojas no momento! <br />
                Clique em <Badge variant={"outline"}>Nova loja</Badge> para adicionar sua loja</Label>
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home