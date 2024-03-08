import { ManagerService } from "@/service/ManagerService"
import { IManager } from "@/interface/IManager"

export abstract class ManagerController {
  private managerController = ManagerService.getInstance()
  
  async getAll(): Promise<IManager[]> {
    return await this.managerController.getAll()
  }

  async get(id: string): Promise<IManager> {
    return await this.managerController.get(id)
  }

  async put(id: string, data: IManager): Promise<void> {
    await this.managerController.putData(id, data)
  }
  
  async delete(id: string): Promise<void> {
    await this.managerController.deleteData(id)
  }
}