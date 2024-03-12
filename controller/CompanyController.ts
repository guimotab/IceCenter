import { ICompany } from "@/interface/ICompany"
import { CompanyService } from "@/service/CompanyService"

export abstract class CompanyController {
  private static companyController = CompanyService.getInstance()

  static async getAll(): Promise<ICompany[]> {
    return await this.companyController.getAll()
  }

  static async get(id: string): Promise<ICompany> {
    return await this.companyController.get(id)
  }

  static async put(id: string, data: ICompany): Promise<void> {
    await this.companyController.putData(id, data)
  }

  static async delete(id: string): Promise<void> {
    await this.companyController.deleteData(id)
  }

  static async findCurrent() {
    return this.get("sovetes-mais")
  }
}