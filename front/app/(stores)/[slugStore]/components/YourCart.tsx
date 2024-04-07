import { Flavors } from "@/classes/Flavors"
import { Revenue } from "@/classes/Revenue"
import { Stock } from "@/classes/Stock"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { FlavorsController } from "@/controller/FlavorsController"
import { RevenueController } from "@/controller/RevenueController"
import { StockController } from "@/controller/StockController"
import { pricesOfIceCream } from "@/enum/pricesOfIcecream"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import useShoppingCart from "@/state/hooks/useShoppingCart"
import flavorsIceCream from "@/types/flavorsIceCream"
import { useEffect, useState } from "react"
import { IoMdCart } from "react-icons/io";

interface YourCartProps {
  stock: IStockStore
  flavors: IFlavorsIceCream[]
  revenue: IRevenueStore
}

const YourCart = ({ flavors, stock, revenue }: YourCartProps) => {
  const shoppingCart = useShoppingCart()
  const [price, setPrice] = useState(0)
  const [canEndShopping, setCanEndShopping] = useState(false)

  useEffect(() => {
    const valueShopping = calcRevenue()
    setPrice(valueShopping)
    if (valueShopping > 0) {
      setCanEndShopping(true)
    } else {
      setCanEndShopping(false)
    }
  }, [shoppingCart])

  function calcRevenue() {
    const itemRevenue: Record<flavorsIceCream | "Casquinha", number> = {
      Morango: 0,
      Chocolate: 0,
      Baunilha: 0,
      Casquinha: 0
    }

    shoppingCart.forEach(item => {
      //O valor da receita = resultado vendido * preço do produto
      itemRevenue[item.item] = item.quantity * pricesOfIceCream[item.item === "Casquinha" ? "Cone" : item.item]
    })

    return itemRevenue.Baunilha + itemRevenue.Casquinha + itemRevenue.Chocolate + itemRevenue.Morango
  }

  function endShopping() {

    const newStock = new Stock(stock)
    const quantityCasquinha = shoppingCart.find(item => item.item === "Casquinha")
    newStock.cone -= quantityCasquinha!.quantity

    const newFlavors = new Flavors(flavors)
    newFlavors.flavors.forEach((flavor, index) => {
      shoppingCart.forEach(item => {
        //atualiza a quantidade do flavor que é igual a item iterado
        if (item.item === flavor.name) {
          const newFlavor = {
            ...flavor,
            quantity: flavor.quantity - item.quantity
          } as IFlavorsIceCream
          newFlavors.put(index, newFlavor)
        }
      })
    })

    const newRevenue = new Revenue(revenue)
    newRevenue.putCash(newRevenue.cash + price)

    StockController.put(stock.id, newStock.informations())
    FlavorsController.putByStockId(stock.id, newFlavors.flavors)
    RevenueController.put(revenue.id, newRevenue.informations())

  }

  return (
    <Card className="flex flex-col justify-between max-w-[20rem] w-full h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <IoMdCart className="text-2xl" />
          Seu Carrinho
        </CardTitle>
        <CardDescription>Valor Total: R${price.toFixed(2).replace(".", ",")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {shoppingCart && shoppingCart.map(shop =>
            shop.quantity !== 0 &&
            <li>{shop.quantity}x {shop.item}</li>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center items-center gap-5">
          {canEndShopping ?
            <AlertDialog>
              <AlertDialogTrigger className="w-full">
                <Button
                  variant={"default"}
                  className="w-full"
                  onClick={endShopping}>Finalizar Compra</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Compra realizada com sucesso!</AlertDialogTitle>
                  <AlertDialogDescription>
                    <p>Sua compra chegará para você em sua casa... um dia! =)</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Maravilha</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            :
            <Button variant={"outline"} className="w-full" disabled>Finalizar Compra</Button>
          }

        </div>
      </CardFooter>
    </Card>
  )
}

export default YourCart