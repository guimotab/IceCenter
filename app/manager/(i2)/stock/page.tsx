"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import useCurrentManager from "@/state/hooks/useCurrentManager"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore"
import { useEffect, useState } from "react"
import BuyStock from "./components/BuyStock"
import CurrentStock from "./components/CurrentStock"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import { FlavorsController } from "@/controller/FlavorsController"
import { RevenueController } from "@/controller/RevenueController"
import { StockController } from "@/controller/StockController"
const Stock = () => {

  const manager = useCurrentManager()
  const store = useCurrentStore()
  const setStore = useUpdateCurrentStore()
  const [stock, setStock] = useState<IStockStore>()
  const [flavors, setFlavors] = useState<IFlavorsIceCream[]>()
  const [revenue, setRevenue] = useState<IRevenueStore>()

  useEffect(() => {
    async function load() {
      const respStock = await StockController.getByStoreId(store.id)
      if (respStock) {
        setStock(respStock)
        const respFlavor = await FlavorsController.getAllByStockId(respStock.id)
        if (respFlavor) {
          setFlavors(respFlavor)
        }
      }
      const respRevenue = await RevenueController.getByStoreId(store.id)
      if (respRevenue) {
        setRevenue(respRevenue)
      }
    }
    if (manager && store) {
      load()
    }
  }, [manager, store])

  return (
    <main className="flex flex-col items-center w-full px-4">
      {manager && store && flavors && revenue && stock &&
        <div className="w-full flex flex-col items-center my-10 max-w-[70rem]">
          <div className="flex flex-col w-full gap-5">
            <h1 className="text-2xl font-semibold">Estoque da Loja</h1>

            <Accordion type="multiple" className="space-y-3 w-full" defaultValue={["item-1"]}>

              <AccordionItem value="item-1" >
                <AccordionTrigger >Estoque atual</AccordionTrigger>
                <AccordionContent className="px-1">

                  <CurrentStock
                    currentStore={store}
                    flavors={flavors}
                    setFlavors={setFlavors}
                    setStock={setStock}
                    stock={stock} />

                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2"  >
                <AccordionTrigger>Comprar estoque</AccordionTrigger>
                <AccordionContent className="px-1">

                  <BuyStock
                    currentStore={store}
                    currentFlavors={flavors}
                    currentRevenue={revenue}
                    currentStock={stock}
                    setFlavors={setFlavors}
                    setRevenue={setRevenue}
                    setStock={setStock} />

                </AccordionContent>
              </AccordionItem>

            </Accordion>

          </div>
        </div>
      }
    </main>
  )
}
export default Stock