import { ManagerService } from "@/service/ManagerService"
import { IManager } from "@/interface/IManager"

export abstract class ManagerController {
  private static managerController = ManagerService.getInstance()
  
  static async createManager(data: IManager){
    this.post(data)
    return true
  }
  static async getByIdStore(idStore: string){
    const result = await this.getAll()
    return result.filter(manager=> manager.idStore === idStore)[0]
  }
  static async findCurrent(idManager: string){
    return await this.get(idManager)
  }
  
  static async getAll(): Promise<IManager[]> {
    return await this.managerController.getAll()
  }

  static async get(id: string): Promise<IManager> {
    return await this.managerController.get(id)
  }

  static async put(id: string, data: IManager): Promise<void> {
    await this.managerController.putData(id, data)
  }

  static async post(data: IManager): Promise<void> {
    await this.managerController.postData(data)
  }
  
  static async delete(id: string): Promise<void> {
    await this.managerController.deleteData(id)
  }
}