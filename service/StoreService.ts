import { IStore } from "@/interface/IStore";
import { errorAxios, HttpService } from "./HttpService";
import axios from "axios";

export class StoreService extends HttpService<IStore> {
  private static storeService: StoreService | undefined
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
    const resp = await axios.get(`${this._url}/byCompany/${idCompany}/getAll`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IStore[] }
  }

  async getBySlug(slug: string) {
    const resp = await axios.get(`${this._url}/bySlug/${slug}`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IStore }
  }
}

