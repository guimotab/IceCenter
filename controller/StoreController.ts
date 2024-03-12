import { IStore } from "@/interface/IStore"
import { StoreService } from "@/service/StoreService"

export abstract class StoreController  {
  private static storeService = StoreService.getInstance()

  static async createStore(data: IStore){
    this.post(data)
    return true
  }
  
  static async getAll(): Promise<IStore[]> {
    return await this.storeService.getAll()
  }

  static async get(id: string): Promise<IStore> {
    return await this.storeService.get(id)
  }

  static async put(id: string, data: IStore) {
    await this.storeService.putData(id, data)
  }

  static async post(data: IStore) {
    await this.storeService.postData(data)
  }
  
  static async delete(id: string) {
    await this.storeService.deleteData(id)
  }

  static async findByCompany(idCompany: string){
    return (await this.getAll()).filter(store=> store.idCompany === idCompany)
  }

}