import { errorAxios, HttpService } from "./HttpService";
import axios from "axios";
import { ISales } from "@/interface/ISales";
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";

export class SalesService extends HttpService<ISales> {
  private static salesService: SalesService | undefined

  private constructor(url = "sales") {
    super(url);
  }
  static getInstance() {
    if (!this.salesService) {
      this.salesService = new SalesService()
    }
    return this.salesService
  }


  async getAllByRevenueId(revenueId: string) {
    const resp = await axios.get(`${this._url}/byRevenue/${revenueId}/getAll`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: ISales[] }
  }

  async postMany(data: ISales[]) {
    const resp = await axios.post(`${this._url}/createMany/`, { data }).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: ISales[] }
  }
}

