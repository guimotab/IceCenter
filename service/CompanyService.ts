import axios from "axios";
import { errorAxios, HttpService } from "./HttpService";
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
  async getByOwnerId(id: string) {
    const resp = await axios.get(`${this._url}/byOwner/${id}`).catch(e => errorAxios(e))
    return resp.data as {resp: string, data?: ICompany}
  }
}