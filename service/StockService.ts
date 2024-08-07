import { errorAxios, HttpService } from "./HttpService";
import axios from "axios";
import { IStockStore } from "@/interface/IStockStore";

export class StockService extends HttpService<IStockStore> {
  private static stockService: StockService | undefined

  private constructor(url = "stock") {
    super(url);
  }
  static getInstance() {
    if (!this.stockService) {
      this.stockService = new StockService()
    }
    return this.stockService
  }

  async getByStoreId(storeId: string) {
    const resp = await axios.get(`${this._url}/byStore/${storeId}`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IStockStore }
  }
}

