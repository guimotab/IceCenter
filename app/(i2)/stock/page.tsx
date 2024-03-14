"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StoreController } from "@/controller/StoreController"
import useCurrentManager from "@/state/hooks/useCurrentManager"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore"
import { useEffect } from "react"
import BuyStock from "./components/BuyStock"
import CurrentStock from "./components/CurrentStock"
const Stock = () => {
  const manager = useCurrentManager()
  const store = useCurrentStore()
  const setStore = useUpdateCurrentStore()
  useEffect(() => {
    async function load() {
      setStore(await StoreController.findById(manager.idStore))
    }
    if (manager && store) {
      load()
    }
  }, [])


  return (
    <main className="flex flex-col items-center w-full ">
      {manager && store &&
        <div className="w-full flex flex-col items-center mt-10 max-w-[70rem]">
          <div className="flex flex-col w-full gap-5">
            <h1 className="text-2xl font-semibold">Estoque da Loja</h1>
            <Accordion type="multiple" className="space-y-3 w-full" defaultValue={["item-1"]}>
              <AccordionItem value="item-1" >
                <AccordionTrigger >Estoque atual</AccordionTrigger>
                <AccordionContent className="px-1">
                  <CurrentStock currentStore={store} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2"  >
                <AccordionTrigger>Comprar estoque</AccordionTrigger>
                <AccordionContent className="px-1">
                  <BuyStock currentStore={store} />
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