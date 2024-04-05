import { IStore } from "@/interface/IStore";
import { HttpService } from "./HttpService";
import axios from "axios";

export class StoreService extends HttpService<IStore> {
  private static storeService: StoreService | undefined
  private static _urlCompany = "http://localhost:4000/store"
  private constructor(url = "store") {
    super(url);
  }
  static getInstance() {
    if (!this.storeService) {
      this.storeService = new StoreService()
    }
    return this.storeService
  }

  async getAllByCompanyId(idCompany: string) {
    const resp = await axios.get(`${StoreService._urlCompany}/all/company/${idCompany}`)
    return resp.data as { resp: string, data?: IStore[] }
  }

  async getBySlug(slug: string) {
    const resp = await axios.get(`http://localhost:4000/${slug}`)
    return resp.data as { resp: string, data?: IStore }
  }
}

