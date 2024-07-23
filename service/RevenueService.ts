import axios from "axios";
import { IRevenueStore } from "@/interface/IRevenueStore";
import { prisma } from "@/lib/prisma";
const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}
export class RevenueService {
  private static revenueService: RevenueService | undefined
  private constructor() { }
  static getInstance() {
    if (!this.revenueService) {
      this.revenueService = new RevenueService()
    }
    return this.revenueService
  }

  async getData(revenueId: string) {
    try {
        const revenue = await prisma.revenue.findUnique({ where: { id: revenueId } })
        if (!revenue) {
            return { resp: "Montante não encontrado" }
        }
        return { resp: "Success", data: revenue }
    } catch (error) {
        console.log(error);
        return { resp: "Ocorreu um erro no servidor" }
    }
}

static async putData(revenueId: string, data: IRevenueStore) {
  try {
    const revenue = await prisma.revenue.update({ where: { id: revenueId }, data })

    return { resp: "Success", data: revenue }
  } catch (error) {
    console.log(error);
    return { resp: "Ocorreu um erro no servidor" }
  }
}

  async getByStoreId(storeId: string) {
    try {
      const revenue = await prisma.revenue.findUnique({ where: { storeId } })
      if (!revenue) {
        return { resp: "Montante não encontrado" }
      }
      return { resp: "Success", data: revenue }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }
}

