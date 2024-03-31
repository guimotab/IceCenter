import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { FlavorsController } from "@/controller/FlavorsController"
import { StockController } from "@/controller/StockController"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { IStockStore } from "@/interface/IStockStore"
import { IStore } from "@/interface/IStore"
import { Dispatch, SetStateAction, useEffect } from "react"
interface CurrentStockProps {
  currentStore: IStore
  stock: IStockStore | undefined
  flavors: IFlavorsIceCream[] | undefined
  setStock: Dispatch<SetStateAction<IStockStore | undefined>>
  setFlavors: Dispatch<SetStateAction<IFlavorsIceCream[] | undefined>>
}
const CurrentStock = ({ currentStore, stock, flavors, setStock, setFlavors }: CurrentStockProps) => {
  useEffect(() => {
    async function load() {
      const resp = await StockController.getByStoreId(currentStore.id)
      if (resp) {
        setStock(resp)
        const respFlavor = await FlavorsController.getAllByStockId(resp.id)
        if (respFlavor) {
          setFlavors(respFlavor)
        }
      }
    }
    if (currentStore) {
      load()
    }
  }, [currentStore])

  return (
    <div className="flex flex-col gap-6">
      {stock && flavors &&
        <>
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
            <Label>Cones</Label>
            <Badge variant={"outline"} className="self-start">
              {`${stock.cone} unidades`}
            </Badge>
          </div>
        </>
      }
    </div>
  )
}
export default CurrentStock