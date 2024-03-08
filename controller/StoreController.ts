import { IStore } from "@/interface/IStore"
import { StoreService } from "@/service/StoreService"

export abstract class StoreController  {
  private storeService = StoreService.getInstance()
  
  async getAll(): Promise<IStore[]> {
    return await this.storeService.getAll()
  }

  async get(id: string): Promise<IStore> {
    return await this.storeService.get(id)
  }

  async put(id: string, data: IStore): Promise<void> {
    await this.storeService.putData(id, data)
  }
  
  async delete(id: string): Promise<void> {
    await this.storeService.deleteData(id)
  }
}