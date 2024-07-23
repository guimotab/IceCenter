import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
import { prisma } from "@/lib/prisma";

export class FlavorsService {
  private static stockService: FlavorsService | undefined
  private constructor() { }
  static getInstance() {
    if (!this.stockService) {
      this.stockService = new FlavorsService()
    }
    return this.stockService
  }

  async putData(stockId: string, data: IFlavorsIceCream[]) {
    try {
      const flavors = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } })
      flavors.forEach(async flavor => {
        const findThisFlavor = data.find(dataFlavor => dataFlavor.id === flavor.id)
        if (findThisFlavor) {
          await prisma.flavorsIceCream.update({ where: { id: flavor.id }, data: { ...findThisFlavor } })
        }
      })
      return { resp: "Success", data: flavors }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async getAllByStockId(stockId: string) {
    try {
      const flavorsIceCream = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } })
      if (!flavorsIceCream) {
        return { resp: "Sabores não encontrados" }
      }
      return { resp: "Success", data: flavorsIceCream }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async getAll() {
    try {
      const flavors = await prisma.flavorsIceCream.findMany({ orderBy: { name: "desc" } })
      if (!flavors) {
        return { resp: "Sabores não encontrados" }
      }
      return { resp: "Success", data: flavors }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async postData({ name, quantity, stockId }: IFlavorsIceCream) {
    try {
      const flavor = await prisma.flavorsIceCream.create({
        data: {
          name,
          quantity,
          stockId
        }
      })
      return flavor.id
    } catch (error) {
      console.log(error);
    }
  }
}
