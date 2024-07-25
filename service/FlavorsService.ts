import { errorAxios, HttpService } from "./HttpService";
import axios from "axios";
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";

export class FlavorsService extends HttpService<IFlavorsIceCream[]> {
  private static stockService: FlavorsService | undefined

  private constructor(url = "flavor") {
    super(url);
  }
  static getInstance() {
    if (!this.stockService) {
      this.stockService = new FlavorsService()
    }
    return this.stockService
  }

  
  async putFlavor(stockId: string, data: IFlavorsIceCream[]) {
    const resp = await axios.put(`${this._url}/${stockId}`, data).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IFlavorsIceCream[] }
  }

  async getAllByStockId(stockId: string) {
    const resp = await axios.get(`${this._url}/${stockId}/getAll`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IFlavorsIceCream[] }
  }
}

