import { ICompany } from "@/interface/ICompany"
import { CompanyService } from "@/service/CompanyService"

export abstract class CompanyController {
  private static companyService = CompanyService.getInstance()

  static async getByOwnerId(id: string) {
    const company = await this.companyService.getByOwnerId(id)
    if(company.data){
      return company.data
    }
  }

  static async getAll(): Promise<ICompany[]> {
    return await this.companyService.getAll()
  }

  static async get(id: string) {
    return await this.companyService.get(id)
  }

  static async put(id: string, data: ICompany): Promise<void> {
    await this.companyService.putData(id, data)
  }

  static async delete(id: string): Promise<void> {
    await this.companyService.deleteData(id)
  }

  static async findCurrent() {
    return this.get("sovetes-mais")
  }
}