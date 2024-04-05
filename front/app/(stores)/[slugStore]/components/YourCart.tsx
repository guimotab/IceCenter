import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { pricesOfIceCream } from "@/enum/pricesOfIcecream"
import useShoppingCart from "@/state/hooks/useShoppingCart"
import flavorsIceCream from "@/types/flavorsIceCream"
import { useEffect, useState } from "react"
import { IoMdCart } from "react-icons/io";

interface YourCartProps {

}

const YourCart = ({ }: YourCartProps) => {
  const shoppingCart = useShoppingCart()
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(calcRevenue())
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
            <li className="">{shop.quantity}x {shop.item}</li>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center items-center gap-5">
          <Button variant={"outline"} className="w-full">Finalizar Compra</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default YourCart