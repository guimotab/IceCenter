import { IAddress } from "@/interface/IAddress"
import { IStore } from "@/interface/IStore"
import { StoreService } from "@/service/StoreService"

export abstract class StoreController {
  private static storeService = StoreService.getInstance()
  static async findAllByCompanyId(idCompany: string) {
    const resp = await this.storeService.getAllByCompanyId(idCompany)
    if (resp.data) {
      return resp.data
    }
  }

  static async getAll(): Promise<IStore[]> {
    return await this.storeService.getAll()
  }

  static async get(id: string) {
    return await this.storeService.get(id)
  }

  static async getStoreBySlug(slug: string) {
    const resp = await this.storeService.getBySlug(slug)
    return resp
  }

  static async put(id: string, data: IStore) {
    return await this.storeService.putData(id, data)
  }

  static async post(storeData: IStore, address: IAddress) {
    const data = { ...storeData, address } as IStore
    return await this.storeService.postData(data)
  }

  static async delete(id: string) {
    return await this.storeService.deleteData(id)
  }
}