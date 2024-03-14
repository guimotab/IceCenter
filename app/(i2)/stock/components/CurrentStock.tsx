import { Store } from "@/classes/Store"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { IStore } from "@/interface/IStore"
interface CurrentStockProps {
  currentStore: IStore
}
const CurrentStock = ({ currentStore }: CurrentStockProps) => {
  const store = new Store(currentStore)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Label>Sabores de Sorvete (10 litros por pacote)</Label>
        <div className="flex gap-3">
          {store.stock.flavors.map(flavor =>
            <Badge key={flavor.name} variant={"outline"}>
              {`${flavor.name}: ${flavor.quantity} pacotes`}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Cones (10 unidades por pacote)</Label>
        <Badge variant={"outline"} className="self-start">
          {`${store.stock.cone} pacotes`}
        </Badge>
      </div>
    </div>
  )
}
export default CurrentStock