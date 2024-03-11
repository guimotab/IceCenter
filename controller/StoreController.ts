import { IStore } from "@/interface/IStore"
import { StoreService } from "@/service/StoreService"

export abstract class StoreController  {
  private static storeService = StoreService.getInstance()
  
  static async getAll(): Promise<IStore[]> {
    return await this.storeService.getAll()
  }

  static async get(id: string): Promise<IStore> {
    return await this.storeService.get(id)
  }

  static async put(id: string, data: IStore): Promise<void> {
    await this.storeService.putData(id, data)
  }
  
  static async delete(id: string): Promise<void> {
    await this.storeService.deleteData(id)
  }

  static async findByCompany(idCompany: string){
    return (await this.getAll()).filter(store=> store.idCompany === idCompany)
  }

}