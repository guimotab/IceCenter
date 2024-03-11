import { ICompany } from "@/interface/ICompany"
import { CompanyService } from "@/service/CompanyService"

export abstract class CompanyController {
  private static managerController = CompanyService.getInstance()

  static async getAll(): Promise<ICompany[]> {
    return await this.managerController.getAll()
  }

  static async get(id: string): Promise<ICompany> {
    return await this.managerController.get(id)
  }

  static async put(id: string, data: ICompany): Promise<void> {
    await this.managerController.putData(id, data)
  }

  static async delete(id: string): Promise<void> {
    await this.managerController.deleteData(id)
  }

  static async findCurrent() {
    return this.get("sovetes-mais")
  }
}