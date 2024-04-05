'use client'
import { StoreController } from "@/controller/StoreController"
import { IStore } from "@/interface/IStore"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CardsItemShop, { CardsItemShopProps } from "./components/CardsItemsShop"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import flavorsIceCream from "@/types/flavorsIceCream"
import { Button } from "@/components/ui/button"
import { pricesOfIceCream } from "@/enum/pricesOfIcecream"
import { Label } from "@/components/ui/label"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import YourCart from "./components/YourCart"
import { FlavorsController } from "@/controller/FlavorsController"
import { RevenueController } from "@/controller/RevenueController"
import { StockController } from "@/controller/StockController"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { IStockStore } from "@/interface/IStockStore"
import useShoppingCart from "@/state/hooks/useShoppingCart"

const Store = () => {

  const searchParams = useParams<{ nameStore: string }>()
  const router = useRouter()
  const [editInformations, setEditInformations] = useState(false)
  const store = useCurrentStore()
  const shoppingCart = useShoppingCart()

  const [stock, setStock] = useState<IStockStore>()
  const [flavors, setFlavors] = useState<IFlavorsIceCream[]>()
  const [revenue, setRevenue] = useState<IRevenueStore>()

  useEffect(() => {
    if (store) {
      loadData()
    }
  }, [store])

  async function loadData() {
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

  function handleAddToCart(){
    
  }


  const itemsShop = [
    {
      name: "Morango",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Morango")?.quantity,
      price: pricesOfIceCream.Morango,
      image: ""
    }, {
      name: "Chocolate",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Chocolate")?.quantity,
      price: pricesOfIceCream.Chocolate,
      image: ""
    }, {
      name: "Baunilha",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Baunilha")?.quantity,
      price: pricesOfIceCream.Baunilha,
      image: ""
    }, {
      name: "Casquinha",
      remainingQuantity: stock?.cone,
      price: pricesOfIceCream.Cone,
      image: ""
    },
  ] as CardsItemShopProps[]

  return (
    <main className="flex flex-col items-center pt-10">
      {store && 
        <div className="flex w-full max-w-[60rem] gap-10">

          <div className="flex gap-5 flex-wrap justify-evenly w-full">
            {itemsShop.map(item =>
              item.remainingQuantity !== 0 &&
              <CardsItemShop {...item} />
            )}
          </div>

          <YourCart />

        </div>
      }
    </main>
  )
}
export default Store