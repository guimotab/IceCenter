import { IStore } from "@/interface/IStore";
import { HttpService } from "./HttpService";
import axios from "axios";
const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}
export class StoreService extends HttpService<IStore> {
  private static storeService: StoreService | undefined
  private static _urlCompany = "http://localhost:3000/store"
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
    const resp = await axios.get(`${StoreService._urlCompany}/byCompany/${idCompany}/getAll`).catch(e=> errorAxios)
    return resp.data as { resp: string, data?: IStore[] }
  }

  async getBySlug(slug: string) {
    const resp = await axios.get(`http://localhost:3000/bySlug/${slug}`).catch(e=> errorAxios)
    return resp.data as { resp: string, data?: IStore }
  }
}

