import { HttpService } from "./HttpService";
import axios from "axios";
import { IStockStore } from "@/interface/IStockStore";
const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}
export class StockService extends HttpService<IStockStore> {
  private static stockService: StockService | undefined
  private static _urlAddress = "http://localhost:4000/stock"
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
    const resp = await axios.get(`${StockService._urlAddress}/store/${storeId}`).catch(e=> errorAxios)
    return resp.data as { resp: string, data?: IStockStore }
  }
}

