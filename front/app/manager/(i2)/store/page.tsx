"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { FlavorsController } from "@/controller/FlavorsController";
import { RevenueController } from "@/controller/RevenueController";
import { StockController } from "@/controller/StockController";
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
import { IRevenueStore } from "@/interface/IRevenueStore";
import { IStockStore } from "@/interface/IStockStore";
import useCurrentStore from "@/state/hooks/useCurrentStore";
import flavorsIceCream from "@/types/flavorsIceCream";
import { endOfDayBalance as endOfDayRevenue } from "@/utils/endOfDayRevenue";
import { useEffect, useState } from "react"
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

interface IDialogRevenue {
  name: flavorsIceCream | "Cone"
  qtdSold: number
}
interface ISuccessDialog {
  items: IDialogRevenue[],
  profit: number
}
const Store = () => {

  const store = useCurrentStore()
  const [stock, setStock] = useState<IStockStore>()
  const [flavors, setFlavors] = useState<IFlavorsIceCream[]>()
  const [revenue, setRevenue] = useState<IRevenueStore>()
  const [showStoreCash, setShowStoreCash] = useState(false)
  const [dialogRevenue, setDialogRevenue] = useState<ISuccessDialog>()
  const [canOpenStore, setCanOpenStore] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function load() {

      const respStock = await StockController.getByStoreId(store.id)
      const respRevenue = await RevenueController.getByStoreId(store.id)
      if (respRevenue) {
        setRevenue(respRevenue)
      }
      if (respStock) {
        setStock(respStock)
        const respFlavor = await FlavorsController.getAllByStockId(respStock.id)
        if (respFlavor) {
          setCanOpenStore(verifyStock(respFlavor, respStock.cone))
          setFlavors(respFlavor)
        }
      }
    }
    if (store) {
      load()
    }
  }, [store])

  function handleCashVisibily() {
    setShowStoreCash(!showStoreCash)
  }

  function showError(description: string, title?: string) {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    })
  }
  function verifyStock(flavors: IFlavorsIceCream[], cone: number) {
    const result = flavors.every(flavor => flavor.quantity === 0) && cone === 0
    return !result
  }

  async function openStore() {
    const [newFlavors, itemsQtdSold, newCones, revenueItems] = endOfDayRevenue(flavors!, stock!.cone)

    const profit = revenueItems.Baunilha + revenueItems.Chocolate + revenueItems.Cone + revenueItems.Morango
    const newRevenue = { ...revenue!, cash: revenue!.cash + profit } as IRevenueStore
    const newStock = { ...stock, cone: newCones } as IStockStore

    const [respRevenue, respStock, respFlavors] = await Promise.all([
      RevenueController.put(revenue!.id, newRevenue),
      StockController.put(stock!.id, newStock),
      FlavorsController.putByStockId(stock!.id, newFlavors)
    ])

    setStock(newStock)
    setRevenue(newRevenue)
    setFlavors(newFlavors)
    setDialogRevenue({ items: itemsQtdSold, profit })
    setCanOpenStore(verifyStock(newFlavors, newStock.cone))
  }

  return (
    <main className="flex flex-col items-center w-full h-screen">
      <Toaster />

      {store && stock && flavors && revenue &&
        <div className="w-full flex flex-col items-center mt-10 max-w-[70rem]">
          <div className="w-full flex flex-col gap-3">

            <div className="flex items-center gap-3">
              <h2 className="text-xl font-medium">Informações da Loja</h2>

              <div>
                <Switch id="airplane-mode" />
              </div>

              <AlertDialog>
                {canOpenStore ?
                  <AlertDialogTrigger>
                    <Button variant={"outline"} className="self-start" onClick={openStore}>Simular Dia de Venda</Button>
                  </AlertDialogTrigger>
                  :
                  <Button className="self-start" onClick={event => showError("Você não tem estoques para vender.", "A loja não foi aberta!")}>Abrir Loja</Button>
                }
                <AlertDialogContent>

                  {dialogRevenue &&
                    <>
                      <AlertDialogHeader>
                        <AlertDialogTitle> Dia finalizado!</AlertDialogTitle>
                        <AlertDialogDescription className="flex flex-col gap-2">
                          <Label>Resumo do dia:</Label>
                          <div className="flex flex-col gap-1">
                            {dialogRevenue.items.map(revenue =>
                              revenue.qtdSold !== 0 && <li key={revenue.name} className="list-disc" >{revenue.name} = {revenue.qtdSold} vendidos.</li>
                            )}
                          </div>
                          <div>
                            <p className="text-black">Você abriu a loja hoje e conseguiu R${dialogRevenue.profit.toFixed(2).replace(".", ",")}!</p>
                            <p className="text-black">Seu saldo agora é de: R${revenue.cash.toFixed(2).replace(".", ",")}.</p>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction>Maravilha!</AlertDialogAction>
                      </AlertDialogFooter>
                    </>
                  }

                </AlertDialogContent>
              </AlertDialog>


            </div>

            <Card className="flex flex-col w-full px-6 py-3 gap-3">
              <div className="flex flex-col gap-5">

                <div className="flex flex-col h-10">
                  <div className="flex items-center gap-2">
                    <Label className="text-lg">Caixa da loja</Label>
                    <div onMouseDown={handleCashVisibily} onMouseUp={handleCashVisibily}>
                      {showStoreCash ? <IoEyeSharp className="text-2xl" /> : <IoEyeOutline className="text-2xl" />}
                    </div>
                  </div>
                  <p>R$ {showStoreCash ? `${revenue.cash.toFixed(2).replace(".", ",")}` : "****"}</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-lg">Estoque da loja</Label>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <Label>Sabores de Sorvete</Label>
                      <div className="flex gap-3">
                        {flavors.map(flavor =>
                          <Badge key={flavor.name} variant={"outline"}>
                            {`${flavor.name}: ${flavor.quantity} pacotes`}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label>Cones (10 unidades por pacote)</Label>
                      <Badge variant={"outline"} className="self-start">
                        {`${stock.cone} pacotes`}
                      </Badge>
                    </div>
                  </div>
                </div>

              </div>
            </Card>

          </div>
        </div>
      }
    </main>
  )
}
export default Store