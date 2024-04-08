import { IRevenueStore } from "@/interface/IRevenueStore";
import { ISales } from "@/interface/ISales";

interface addManySales {
  name: string
  quantity: number
  price: number
}

export class Sales {
  private _sales: ISales[];

  constructor(sales: ISales[]) {
    this._sales = sales
  }

  addMany(sales: addManySales[], revenue: IRevenueStore) {
    const newSales = sales.filter(sale => sale.quantity !== 0)
      .map(sale => {
        if (sale.quantity !== 0) {
          const newSale = {
            name: sale.name,
            price: sale.price,
            quantity: sale.quantity,
            revenueId: revenue.id,
            date: new Date(),
          } as ISales

          this._sales.push(newSale)
          return newSale
        }
      })
    return newSales as ISales[]
  }

  add(name: string, price: number, quantity: number, revenue: IRevenueStore) {
    const newSales = {
      date: new Date(),
      name,
      price,
      quantity,
      revenueId: revenue.id
    } as ISales
    this._sales.push(newSales)
    return newSales
  }

  public get sales() {
    return this._sales;
  }

  public set sales(value) {
    this._sales = value;
  }

}