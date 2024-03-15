import { HttpService } from "./HttpService";
import { ICompany } from "@/interface/ICompany";

export class CompanyService extends HttpService<ICompany> {
  private static companyService: CompanyService | undefined
  private constructor(url = "company") {
    super(url);
  }
  static getInstance() {
    if (!this.companyService) {
      this.companyService = new CompanyService()
    }
    return this.companyService
  }
}