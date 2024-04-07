import { Cart } from "@/classes/Cart"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { pricesOfIceCream } from "@/enum/pricesOfIcecream"
import { IShoppingCart } from "@/interface/IShoppingCart"
import useShoppingCart from "@/state/hooks/useShoppingCart"
import { useUpdateShoppingCart } from "@/state/hooks/useUpdateShoppingCart"
import flavorsIceCream from "@/types/flavorsIceCream"
import { Content } from "@radix-ui/react-dropdown-menu"
import { Title, Description } from "@radix-ui/react-toast"
import { ChangeEvent, ChangeEventHandler, useState } from "react"

export interface CardsItemShopProps {
  name: flavorsIceCream | "Casquinha",
  remainingQuantity: number,
  price: pricesOfIceCream
  className: string
  image: string
}

const CardsItemShop = ({ name, image, className, remainingQuantity, price }: CardsItemShopProps) => {
  const [quantity, setQuantity] = useState(0)
  const [disableAddButton, setDisableAddButtom] = useState(false)
  const [disableRemoveButton, setDisableRemoveButtom] = useState(true)
  const shoppingCart = useShoppingCart()
  const setShoppingCart = useUpdateShoppingCart()

  function addItem() {
    const newQuantity = quantity + 1
    if (newQuantity <= remainingQuantity) {
      setQuantity(newQuantity)
      handlePutQuantity(newQuantity)
      setDisableAddButtom(false)
      setDisableRemoveButtom(false)
    } else {
      return setDisableAddButtom(true)
    }

    if (newQuantity === remainingQuantity) {
      setDisableAddButtom(true)
    }
  }

  function removeItem() {
    const newQuantity = quantity - 1
    if (newQuantity >= 0) {
      setQuantity(newQuantity)
      handlePutQuantity(newQuantity)
      setDisableRemoveButtom(false)
      setDisableAddButtom(false)
    } else {
      return setDisableRemoveButtom(true)
    }
    if (newQuantity === 0) {
      setDisableRemoveButtom(true)
    }
  }

  function handlePutQuantity(newQuantity: number) {

    const index = shoppingCart.findIndex(shop => shop.item === name)
    if (index === -1) {
      return
    }

    const cart = new Cart(shoppingCart)
    cart.putQuantity(newQuantity, index)

    setShoppingCart(cart.cart)
  }

  function handleManualChangeQuantity(event: ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value)
    if (!isNaN(value) && value <= remainingQuantity) {
      setQuantity(Math.floor(value))
      handlePutQuantity(value)
      if (value === 0) {
        setDisableRemoveButtom(true)
        setDisableAddButtom(false)
      } else if (value === remainingQuantity) {
        setDisableRemoveButtom(false)
        setDisableAddButtom(true)
      } else {
        setDisableRemoveButtom(false)
        setDisableAddButtom(false)

      }
    }
  }

  return (
    <Card className="flex flex-col justify-between w-full max-w-[16rem]">
      <CardHeader>
        <CardTitle>{name === "Casquinha" ? name : `Pote de ${name}`}</CardTitle>
        <CardDescription>R${price.toFixed(2).replace(".", ",")} ({remainingQuantity} restantes)</CardDescription>
      </CardHeader>
      <CardContent >
        <div className="flex items-center justify-center">
          <img src={image} alt={`Imagem sorvete ${name.toLowerCase()}`} className={`${className}`} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center items-center gap-5">
          <Button size={"sm"} variant={"outline"} disabled={disableRemoveButton} onClick={removeItem}>-</Button>
          <Input value={quantity} onChange={handleManualChangeQuantity} className=" text-center " />
          <Button size={"sm"} variant={"outline"} disabled={disableAddButton} onClick={addItem}>+</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardsItemShop