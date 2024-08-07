import axios from "axios";
import { errorAxios, HttpService } from "./HttpService";
import { IManager } from "@/interface/IManager";

export class ManagerService extends HttpService<IManager> {
  private static managerService: ManagerService | undefined
  private constructor(url = "manager") {
    super(url);
  }
  static getInstance() {
    if (!this.managerService) {
      this.managerService = new ManagerService()
    }
    return this.managerService
  }

  async getByStoreId(storeId: string){
    const resp = await axios.get(`${this._url}/byStore/${storeId}`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IManager }
  }

}