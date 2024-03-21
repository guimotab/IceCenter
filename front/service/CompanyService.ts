import axios from "axios";
import { HttpService } from "./HttpService";
import { ICompany } from "@/interface/ICompany";

export class CompanyService extends HttpService<ICompany> {
  private static companyService: CompanyService | undefined
  private static _urlCompany = "http://localhost:4000/company"
  private constructor(url = "company") {
    super(url);
  }
  static getInstance() {
    if (!this.companyService) {
      this.companyService = new CompanyService()
    }
    return this.companyService
  }
  async getByOwnerId(id: string) {
    const resp = await axios.get(`${CompanyService._urlCompany}/owner/${id}`)
    return resp.data as {resp: string, data?: ICompany}
  }
}