import { errorAxios, HttpService } from "./HttpService";
import axios from "axios";
import { IRevenueStore } from "@/interface/IRevenueStore";

export class RevenueService extends HttpService<IRevenueStore> {
  private static revenueService: RevenueService | undefined

  private constructor(url = "revenue") {
    super(url);
  }
  static getInstance() {
    if (!this.revenueService) {
      this.revenueService = new RevenueService()
    }
    return this.revenueService
  }

  async getByStoreId(storeId: string) {
    const resp = await axios.get(`${this._url}/byStore/${storeId}`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IRevenueStore }
  }
}

