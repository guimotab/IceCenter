import { IStockStore } from "@/interface/IStockStore";
import { prisma } from "@/lib/prisma";
const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}
export class StockService {
  private static stockService: StockService | undefined
  private constructor() { }
  static getInstance() {
    if (!this.stockService) {
      this.stockService = new StockService()
    }
    return this.stockService
  }

  static async putData(stockId: string, data: IStockStore) {
    try {
      const stock = await prisma.stockStore.update({ where: { id: stockId }, data })

      return { resp: "Success", data: stock }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async getByStoreId(storeId: string) {
    try {
      const stock = await prisma.stockStore.findUnique({ where: { storeId: storeId } })
      if (!stock) {
        return { resp: "Estoque não encontrado" }
      }
      return { resp: "Success", data: stock }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async getAll() {
    try {
      const managers = await prisma.stockStore.findMany({})
      if (!managers) {
        return { resp: "Estoques não encontrados" }
      }
      return { resp: "Success", data: managers }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }
}

