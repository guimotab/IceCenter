"use client"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/toaster";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { FlavorsController } from "@/controller/FlavorsController";
import { RevenueController } from "@/controller/RevenueController";
import { SalesController } from "@/controller/SalesController";
import { StockController } from "@/controller/StockController";
import { StoreController } from "@/controller/StoreController";
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
import { IRevenueStore } from "@/interface/IRevenueStore";
import { ISales } from "@/interface/ISales";
import { IStockStore } from "@/interface/IStockStore";
import { IStore } from "@/interface/IStore";
import useCurrentStore from "@/state/hooks/useCurrentStore";
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore";
import flavorsIceCream from "@/types/flavorsIceCream";
import { endOfDayBalance as endOfDayRevenue } from "@/utils/endOfDayRevenue";
import Link from "next/link";
import { useEffect, useState } from "react"
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { TbWorldShare } from "react-icons/tb";
import TableHistoric from "./components/TableHistoric";

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
  const setStore = useUpdateCurrentStore()
  const [stock, setStock] = useState<IStockStore>()
  const [flavors, setFlavors] = useState<IFlavorsIceCream[]>()
  const [revenue, setRevenue] = useState<IRevenueStore>()
  const [showStoreCash, setShowStoreCash] = useState(false)
  const [dialogRevenue, setDialogRevenue] = useState<ISuccessDialog>()
  const [canOpenStore, setCanOpenStore] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (store) {
      load()
    }
  }, [store])

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

  async function handleOpenStore() {
    const isOpen = !store.isOpen
    const newStore = { ...store, isOpen } as IStore
    const respStore = await StoreController.put(store.id, newStore)
    if (respStore.resp !== "Success") {
      return showError(respStore.resp)
    }
    setStore(newStore)
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
              <h2 className="text-xl font-semibold">Informações da Loja</h2>
              {store.isOpen ?
                <Link href={`/${store.slug}`} target="_blank">
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="space-x-2">
                    <TbWorldShare className="text-xl" />
                    <p>Acessar na Web</p>
                  </Button>
                </Link>
                :
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant={"secondary"}
                        disabled
                        size={"sm"}
                        className="space-x-2">
                        <TbWorldShare className="text-xl" />
                        <p>Acessar na Web</p>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Abra a loja para poder acessar na web</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
            </div>

            <Card className="flex flex-col w-full px-6 py-3 gap-3">
              <div className="flex flex-col gap-5">

                <div className="flex flex-col">
                  <div className="flex w-full justify-between">

                    <div className="flex items-center gap-2">
                      <Label className="text-lg">Caixa da loja</Label>
                      <div onMouseDown={handleCashVisibily} onMouseUp={handleCashVisibily}>
                        {showStoreCash ? <IoEyeSharp className="text-2xl" /> : <IoEyeOutline className="text-2xl" />}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <AlertDialog>
                        {canOpenStore ?
                          <AlertDialogTrigger>
                            <Button variant={"outline"} className="self-start" onClick={openStore}>Simular dia de venda</Button>
                          </AlertDialogTrigger>
                          :
                          <Button className="self-start" onClick={event => showError("Você não tem estoques para vender.", "A loja não foi aberta!")}>Simular dia de venda</Button>
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
                      <div>
                        <Button variant={store.isOpen ? "destructive" : "default"} onClick={handleOpenStore}>{store.isOpen ? "Fechar loja" : "Abrir loja"}</Button>
                      </div>
                    </div>

                  </div>

                  <p>R$ {showStoreCash ? `${revenue.cash.toFixed(2).replace(".", ",")}` : "****"}</p>

                </div>

              </div>
            </Card>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">Histórico de Vendas</h2>
              <Card className="flex flex-col w-full px-6 py-3 gap-3">
                <TableHistoric store={store} revenue={revenue} />
              </Card>
            </div>


          </div>
        </div>
      }
    </main>
  )
}
export default Store