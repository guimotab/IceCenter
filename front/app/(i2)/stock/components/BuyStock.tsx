import { Store } from "@/classes/Store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import { IStore } from "@/interface/IStore"
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"

interface BuyStockProps {
  currentStore: IStore
  revenue: IRevenueStore | undefined
  flavors: IFlavorsIceCream[] | undefined
  setStock: Dispatch<SetStateAction<IStockStore | undefined>>
  setFlavors: Dispatch<SetStateAction<IFlavorsIceCream[] | undefined>>
  setRevenue: Dispatch<SetStateAction<IRevenueStore | undefined>>
}
const BuyStock = ({ currentStore, flavors, revenue, setStock, setRevenue, setFlavors }: BuyStockProps) => {

  const store = new Store(currentStore)
  const [strawBerry, setstrawBerry] = useState(0)
  const [choco, setChoco] = useState(0)
  const [vanilla, setVanilla] = useState(0)
  const [cone, setCone] = useState(0)
  const [amount, setAmount] = useState(0)
  const [canBuy, setCanBuy] = useState(false)

  const setStore = useUpdateCurrentStore()

  useEffect(() => {
    ifCanBuy()
    changeAmount()
  }, [strawBerry, choco, vanilla, cone])
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
    function changeValue(value: number) {
      arrayItemShop.forEach(item => {
        if (item.price * value < revenue!.cash) {
          if (item.name === typeInput) {
            item.setQuantity(value)
          }
        }
      })
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

  function handleFinishShop() {
    flavors!.forEach((flavor, index) => {
      const findTypeFlavor = arrayItemShop.find(item => item.name === flavor.name)
      if (findTypeFlavor) {
        const newStock = {
          name: findTypeFlavor.name,
          quantity: findTypeFlavor.quantity + flavor.quantity
        } as IFlavorsIceCream
        setFlavors(prev => prev?.splice(index, 1, newStock))
      }
    })
    setStock(prev => ({ ...prev!, cone: prev!.cone + cone }))
    setRevenue(prev => ({ ...prev!, cash: prev!.cash - amount }))
    setStore(store.informations())
    resetShop()
  }

  const arrayItemShop = [
    {
      name: "Morango",
      quantity: strawBerry,
      setQuantity: setstrawBerry,
      price: 20.21
    }, {
      name: "Chocolate",
      quantity: choco,
      setQuantity: setChoco,
      price: 30.43
    }, {
      name: "Baunilha",
      quantity: vanilla,
      setQuantity: setVanilla,
      price: 10.21
    }, {
      name: "Cone",
      quantity: cone,
      setQuantity: setCone,
      price: 8.00
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
                  <p className="font-medium">Caixa </p>
                  <p className="font-medium">Preço </p>
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