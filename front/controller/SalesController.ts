import { ISales } from "@/interface/ISales"
import { SalesService } from "@/service/SalesService"

export abstract class SalesController {
  private static salesService = SalesService.getInstance()

  static async getAllByRevenueId(revenueId: string) {
    const resp = await this.salesService.getAllByRevenueId(revenueId)
    if (resp.data) {
      return resp.data
    } else {
      return []
    }
  }

  static async get(id: string) {
    return await this.salesService.get(id)
  }

  static async post(data: ISales) {
    return await this.salesService.postData("create", data)
  }

  static async postMany(data: ISales[]) {
    return await this.salesService.postMany(data)
  }

}