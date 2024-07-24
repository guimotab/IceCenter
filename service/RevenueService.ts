import { HttpService } from "./HttpService";
import axios from "axios";
import { IRevenueStore } from "@/interface/IRevenueStore";
const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}
export class RevenueService extends HttpService<IRevenueStore> {
  private static revenueService: RevenueService | undefined
  private static _urlAddress = "http://localhost:3000/revenue"
  private constructor(url = "revenue") {
    super(url);
  }
  static getInstance() {
    if (!this.revenueService) {
      this.revenueService = new RevenueService()
    }
    return this.revenueService
  }

  async getByStoreId(stockId: string) {
    const resp = await axios.get(`${RevenueService._urlAddress}/stock/${stockId}`).catch(e => errorAxios)
    return resp.data as { resp: string, data?: IRevenueStore }
  }
}

