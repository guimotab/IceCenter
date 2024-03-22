import { IRevenueStore } from "@/interface/IRevenueStore"
import { RevenueService } from "@/service/RevenueService"

export abstract class RevenueController {
  private static flavorsService = RevenueService.getInstance()
  static async getByStoreId(stockId: string) {
    const resp = await this.flavorsService.getByStoreId(stockId)
    if(resp.data){
      return resp.data
    }
  }

  static async get(id: string) {
    return await this.flavorsService.get(id)
  }

  static async put(id: string, data: IRevenueStore) {
    await this.flavorsService.putData(id, data)
  }

  static async post(data: IRevenueStore) {
    return await this.flavorsService.postData("create", data)
  }

  static async delete(id: string) {
    await this.flavorsService.deleteData(id)
  }


}