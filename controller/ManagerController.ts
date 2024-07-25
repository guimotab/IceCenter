import { ManagerService } from "@/service/ManagerService"
import { IManager } from "@/interface/IManager"

export abstract class ManagerController {
  private static managerController = ManagerService.getInstance()

  static async getByStoreId(storeId: string){
    const resp = await this.managerController.getByStoreId(storeId)
    if(resp.data){
      return resp.data
    }
  }

  static async findCurrent(idManager: string) {
    return await this.get(idManager)
  }

  static async getAll(): Promise<IManager[]> {
    return await this.managerController.getAll()
  }

  static async get(id: string) {
    const result = await this.managerController.get(id)
    if(result.data){
      return result.data
    }
  }

  static async put(id: string, data: IManager) {
    return await this.managerController.putData(id, data)
  }

  static async post(data: IManager) {
    return await this.managerController.postData(data)
  }

  static async delete(id: string): Promise<void> {
    await this.managerController.deleteData(id)
  }
}