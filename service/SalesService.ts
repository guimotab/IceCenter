import { ISales } from "@/interface/ISales";
import { prisma } from "@/lib/prisma";

export class SalesService {
  private static salesService: SalesService | undefined
  private constructor() { }
  static getInstance() {
    if (!this.salesService) {
      this.salesService = new SalesService()
    }
    return this.salesService
  }

  async getData(id: string) {
		try {
			const sales = await prisma.sales.findUnique({ where: { id } })
			if (!sales) {
				return { resp: "Vendas da loja não encontrada" }
			}
			return { resp: "Success", data: sales }
		} catch (error) {
			console.log(error);
			return { msg: "Ocorreu um erro no servidor" }
		}
	}

  public static async postData(data: ISales) {
		try {
			const sales = await prisma.sales.create({ data })
			return { resp: "Success", data: sales }
		} catch (error) {
			console.log(error);
			return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
		}
	}

  async getAllByRevenueId(revenueId: string) {
    try {
      const sales = await prisma.sales.findMany({ where: { revenueId: revenueId } })
      if (!sales) {
        return { resp: "Vendas da loja não encontradas" }
      }
      return { resp: "Success", data: sales }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async postMany(data: ISales[]) {
    try {
      const sales = await prisma.sales.createMany({ data })
      return { resp: "Success", data: sales }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }
}

