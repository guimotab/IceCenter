import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream"
import { FlavorsService } from "@/service/FlavorsService"

export abstract class FlavorsController {
  private static flavorsService = FlavorsService.getInstance()
  static async getAllByStockId(stockId: string) {
    const resp = await this.flavorsService.getAllByStockId(stockId)
    if(resp.data){
      return resp.data
    }
  }

  static async get(id: string) {
    return await this.flavorsService.get(id)
  }

  static async put(id: string, data: IFlavorsIceCream) {
    await this.flavorsService.putData(id, data)
  }

  static async post(data: IFlavorsIceCream) {
    return await this.flavorsService.postData("create", data)
  }

  static async delete(id: string) {
    await this.flavorsService.deleteData(id)
  }


}