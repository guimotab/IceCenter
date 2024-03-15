import { IOwner } from "@/interface/IOwner"
import { OwnerService } from "@/service/OwnerService"

export abstract class OwnerController {
  private static ownerService = OwnerService.getInstance()

  static async getAll(): Promise<IOwner[]> {
    return await this.ownerService.getAll()
  }

  static async get(id: string): Promise<IOwner> {
    return await this.ownerService.get(id)
  }

  static async put(id: string, data: IOwner): Promise<void> {
    await this.ownerService.putData(id, data)
  }

  static async delete(id: string): Promise<void> {
    await this.ownerService.deleteData(id)
  }

  static async findCurrent(){
    return this.get("donoMais")
  }

}

