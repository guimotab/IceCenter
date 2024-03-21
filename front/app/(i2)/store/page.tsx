"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { StockController } from "@/controller/StockController";
import { IStockStore } from "@/interface/IStockStore";
import useCurrentStore from "@/state/hooks/useCurrentStore";
import { useEffect, useState } from "react"
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const Store = () => {
  const store = useCurrentStore()
  const [stock, setStock] = useState<IStockStore>()
  console.log("🚀 ~ Store ~ stock:", stock)
  const [showStoreCash, setShowStoreCash] = useState(false)
  function handleCashVisibily() {
    setShowStoreCash(!showStoreCash)
  }
  useEffect(() => {
    async function load() {
      const resp = await StockController.getByStoreId(store.id)
      if (resp) {
        setStock(resp)
      }
    }
    if (store) {
      load()
    }
  }, [store])
  return (
    <main className="flex flex-col items-center w-full h-screen">
      {store && stock &&
        <div className="w-full flex flex-col items-center mt-10 max-w-[70rem]">
          <Card className="flex flex-col w-full px-6 py-3 gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-medium">Informações da Loja</h2>
              <Button className="self-start">Abrir Loja</Button>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col h-10">
                <div className="flex items-center gap-2">
                  <Label className="text-lg">Caixa da loja</Label>
                  <div onMouseDown={handleCashVisibily} onMouseUp={handleCashVisibily}>
                    {showStoreCash ? <IoEyeSharp className="text-2xl" /> : <IoEyeOutline className="text-2xl" />}
                  </div>
                </div>
                <p>R$ {showStoreCash ? `${store.revenue.cash.toFixed(2).replace(".", ",")}` : "****"}</p>
              </div>
              <div className="space-y-3">
                <Label className="text-lg">Estoque da loja</Label>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Label>Sabores de Sorvete (10 litros por pacote)</Label>
                    <div className="flex gap-3">
                      {stock.flavors.map(flavor =>
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
          <div className="flex flex-col w-full gap-5">
          </div>
        </div>
      }
    </main>
  )
}
export default Store