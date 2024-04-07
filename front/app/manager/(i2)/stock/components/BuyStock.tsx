import { Flavors } from "@/classes/Flavors"
import { Revenue } from "@/classes/Revenue"
import { Stock } from "@/classes/Stock"
import { Store } from "@/classes/Store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { FlavorsController } from "@/controller/FlavorsController"
import { RevenueController } from "@/controller/RevenueController"
import { StockController } from "@/controller/StockController"
import { StoreController } from "@/controller/StoreController"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import { IStore } from "@/interface/IStore"
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"

interface BuyStockProps {
  currentStore: IStore
  currentRevenue: IRevenueStore
  currentFlavors: IFlavorsIceCream[]
  currentStock: IStockStore
  setStock: Dispatch<SetStateAction<IStockStore | undefined>>
  setFlavors: Dispatch<SetStateAction<IFlavorsIceCream[] | undefined>>
  setRevenue: Dispatch<SetStateAction<IRevenueStore | undefined>>
}
const BuyStock = ({ currentStore, currentFlavors, currentRevenue, currentStock, setStock, setRevenue, setFlavors }: BuyStockProps) => {

  const store = new Store(currentStore)
  const stock = new Stock(currentStock)
  const flavors = new Flavors(currentFlavors)
  const revenue = new Revenue(currentRevenue)
  const [strawBerry, setstrawBerry] = useState(0)
  const [choco, setChoco] = useState(0)
  const [vanilla, setVanilla] = useState(0)
  const [cone, setCone] = useState(0)
  const [amount, setAmount] = useState(0)
  const [canBuy, setCanBuy] = useState(false)
  const { toast } = useToast()

  const setStore = useUpdateCurrentStore()

  useEffect(() => {
    ifCanBuy()
    changeAmount()
  }, [strawBerry, choco, vanilla, cone])

  function showError(description: string, title?: string) {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    })
  }

  function resetShop() {
    setstrawBerry(0), setChoco(0), setVanilla(0), setCone(0)
  }

  function ifCanBuy() {
    const result = arrayItemShop.every(item => item.quantity === 0)
    setCanBuy(!result)
  }

  function changeAmount() {
    let amount = 0
    arrayItemShop.forEach(item => amount += item.quantity * item.price)
    setAmount(amount)
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {

    function verifyIfCanSet(value: number) {
      const [valueStrawberry, valueChoco, valueVanilla, valueCone] = arrayItemShop.map(item => {
        if (item.name === typeInput) {
          return item.price * value
        }
        return item.price * item.quantity
      })
      if (valueStrawberry + valueChoco + valueVanilla + valueCone <= revenue!.cash) {
        return true
      }
    }

    function changeValue(value: number) {
      const canSet = verifyIfCanSet(value)
      if (canSet) {
        const itemFound = arrayItemShop.find(item => item.name === typeInput)!
        itemFound.setQuantity(value)
      }
    }

    const value = event.target.value
    const valueNumber = Number(value)
    const typeInput = event.target.id

    if (typeof valueNumber === "number") {
      changeValue(valueNumber)
    }
    if (value === "" || valueNumber < 0) {
      changeValue(0)
    }
  }

  async function handleFinishShop() {
    flavors.flavors.forEach((flavor, index) => {

      const findTypeFlavor = arrayItemShop.find(item => item.name === flavor.name)
      if (findTypeFlavor) {

        const newStock = {
          ...flavor,
          name: findTypeFlavor.name,
          quantity: findTypeFlavor.quantity + flavor.quantity
        } as IFlavorsIceCream

        flavors.put(index, newStock)
        setFlavors(flavors.flavors)
      }
    })

    stock.putCones(cone)
    revenue.putCash(-amount)

    const [respStock, respRevenue, respStore, respFlavor] = await Promise.all([
      StockController.put(stock.id, stock.informations()),
      RevenueController.put(revenue.id, revenue.informations()),
      StoreController.put(store.id, store.informations()),
      FlavorsController.putByStockId(flavors.stockId, flavors.flavors)
    ])
    if (respStock.resp !== "Success") {
      showError(respStock.resp)
    } else if (respRevenue.resp !== "Success") {
      showError(respRevenue.resp)
    } else if (respStore.resp !== "Success") {
      showError(respStore.resp)
    } else if (respFlavor.resp !== "Success") {
      showError(respFlavor.resp)
    }

    setStock(stock.informations())
    setRevenue(revenue.informations())
    setStore(store.informations())

    resetShop()
  }

  const arrayItemShop = [
    {
      name: "Morango",
      quantity: strawBerry,
      setQuantity: setstrawBerry,
      price: 12.21
    }, {
      name: "Chocolate",
      quantity: choco,
      setQuantity: setChoco,
      price: 16.43
    }, {
      name: "Baunilha",
      quantity: vanilla,
      setQuantity: setVanilla,
      price: 14.21
    }, {
      name: "Cone",
      quantity: cone,
      setQuantity: setCone,
      price: 0.40
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {revenue &&
        <>
          <div className="flex flex-col gap-5">
            <div className="flex gap-8">
              {arrayItemShop.map(item =>
                <div key={item.name} className="flex flex-col gap-2">
                  <Label>{`${item.name} (R$${item.price.toFixed(2).replace(".", ",")})`}</Label>
                  <Input id={item.name} onChange={handleInput} type="number" value={item.quantity} className="w-32" />
                </div>
              )}
            </div>
            <div className="w-full max-w-52 px-4 py-2 border-2 rounded-sm border-dashed">
              <div className="flex items-center justify-between ">
                <div className="flex flex-col  h-full justify-between gap-2">
                  <p className="font-medium">Caixa</p>
                  <p className="font-medium">Preço</p>
                </div>
                <div className="flex flex-col h-full justify-between  gap-2">
                  <p className="font-medium text-end">{revenue.cash.toFixed(2).replace(".", ",")}</p>
                  <p className={`font-medium text-end ${amount !== 0 && "text-destructive"}`}>- {amount.toFixed(2).replace(".", ",")}</p>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={handleFinishShop} variant={`${canBuy ? "default" : "outline"}`} className="self-start" disabled={!canBuy}>Finalizar compra</Button>
        </>
      }
    </div>
  )
}
export default BuyStock