import { IStockStore } from "@/interface/IStockStore"
import { StockService } from "@/service/StockService"

export abstract class StockController {
  private static stockService = StockService.getInstance()
  static async getByStoreId(storeId: string) {
    const resp = await this.stockService.getByStoreId(storeId)
    if(resp.data){
      return resp.data
    }
  }

  static async get(id: string) {
    return await this.stockService.get(id)
  }

  static async put(id: string, data: IStockStore) {
    return await this.stockService.putData(id, data)
  }

  static async post(data: IStockStore) {
    return await this.stockService.postData("create", data)
  }

  static async delete(id: string) {
    await this.stockService.deleteData(id)
  }


}