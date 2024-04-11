'use client'
import { useEffect, useState } from "react"
import CardsItemShop, { CardsItemShopProps } from "./components/CardsItemsShop"
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { pricesOfIceCream } from "@/enum/pricesOfIcecream"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import YourCart from "./components/YourCart"
import { FlavorsController } from "@/controller/FlavorsController"
import { StockController } from "@/controller/StockController"
import { IStockStore } from "@/interface/IStockStore"
import { IRevenueStore } from "@/interface/IRevenueStore"
import { RevenueController } from "@/controller/RevenueController"
import { useUpdateShoppingCart } from "@/state/hooks/useUpdateShoppingCart"
import { Cart } from "@/classes/Cart"
import useShoppingCart from "@/state/hooks/useShoppingCart"
import { ISales } from "@/interface/ISales"
import { SalesController } from "@/controller/SalesController"

const Store = () => {

  const store = useCurrentStore()
  const shoppingCart = useShoppingCart()
  const setShoppingCart = useUpdateShoppingCart()
  const [stock, setStock] = useState<IStockStore>()
  const [flavors, setFlavors] = useState<IFlavorsIceCream[]>()
  const [revenue, setRevenue] = useState<IRevenueStore>()
  const [sales, setSales] = useState<ISales[]>()

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
      const respSales = await SalesController.getAllByRevenueId(respRevenue.id)
      if (respSales) {
        return setSales(respSales)
      }
    }
    throw new Error()
  }

  function resetCart() {
    const cartReset = new Cart(shoppingCart)
    cartReset.reset()
    setShoppingCart(cartReset.cart)

    itemsShop = itemsShop.map(item => {
      if (item.name === "Casquinha") {
        item.remainingQuantity = stock!.cone
      } else {
        const flavorFinded = flavors!.find(flavor => flavor.name === item.name)
        item.remainingQuantity = flavorFinded!.quantity
      }
      return item
    })

  }

  /**
   * Atualiza os setStock, setFlavors e setRevenue
   * @param valueStock valor do Stock que será modificado
   * @param valueFlavors valor do Flavors[] que será modificado
   * @param valueRevenue valor do Revenue que será modificado
   */
  async function updateSetters(valueStock: IStockStore, valueFlavors: IFlavorsIceCream[], valueRevenue: IRevenueStore) {
    setStock(valueStock)
    setFlavors(valueFlavors)
    setRevenue(valueRevenue)
  }

  let itemsShop = [
    {
      name: "Morango",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Morango")?.quantity,
      price: pricesOfIceCream.Morango,
      image: "/assets/flavors/morango.jpg",
      className: "w-[11rem]",
    }, {
      name: "Chocolate",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Chocolate")?.quantity,
      price: pricesOfIceCream.Chocolate,
      image: "/assets/flavors/chocolate.png",
      className: "w-[11rem]",
    }, {
      name: "Baunilha",
      remainingQuantity: flavors?.find(flavor => flavor.name === "Baunilha")?.quantity,
      price: pricesOfIceCream.Baunilha,
      image: "/assets/flavors/baunilha.png",
      className: "w-[10rem]",
    }, {
      name: "Casquinha",
      remainingQuantity: stock?.cone,
      price: pricesOfIceCream.Cone,
      image: "/assets/flavors/casquinha.png",
      className: "w-[7rem]",
    },
  ] as CardsItemShopProps[]

  return (
    <main className="flex flex-col items-center py-10 px-4 sm:px-6">
      {store && flavors && stock && revenue && sales &&
        <div className="grid w-full max-w-[60rem] gap-10">

          <div className="flex gap-5 flex-wrap justify-evenly max-w-[36rem] w-full">
            {itemsShop.map(item =>
              item.remainingQuantity !== 0 &&
              <CardsItemShop {...item} />
            )}
          </div>
          <div className="flex w-full justify-center row-start-1 sm:col-start-2">
            <YourCart
              stock={stock}
              flavors={flavors}
              revenue={revenue}
              sales={sales}
              updateSetters={updateSetters}
              resetCart={resetCart} />
          </div>
        </div>
      }
    </main>
  )
}
export default Store