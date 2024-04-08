import { HttpService } from "./HttpService";
import axios from "axios";
import { ISales } from "@/interface/ISales";

export class SalesService extends HttpService<ISales> {
  private static salesService: SalesService | undefined
  private static _urlAddress = "http://localhost:4000/sales"
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
    const resp = await axios.get(`${SalesService._urlAddress}/all/${revenueId}`)
    return resp.data as { resp: string, data?: ISales[] }
  }

  async postMany(data: ISales[]) {
    const resp = await axios.post(`${SalesService._urlAddress}/createMany/`, { data })
    return resp.data as { resp: string, data?: ISales[] }
  }
}

