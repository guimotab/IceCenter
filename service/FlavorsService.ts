import { HttpService } from "./HttpService";
import axios from "axios";
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}
export class FlavorsService extends HttpService<IFlavorsIceCream[]> {
  private static stockService: FlavorsService | undefined
  private static _urlAddress = "http://localhost:3000/flavors"
  private constructor(url = "flavors") {
    super(url);
  }
  static getInstance() {
    if (!this.stockService) {
      this.stockService = new FlavorsService()
    }
    return this.stockService
  }


  async getAllByStockId(stockId: string) {
    const resp = await axios.get(`${FlavorsService._urlAddress}/${stockId}/getAll`).catch(e => errorAxios)
    return resp.data as { resp: string, data?: IFlavorsIceCream[] }
  }
}

