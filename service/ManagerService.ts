import axios from "axios";
import { HttpService } from "./HttpService";
import { IManager } from "@/interface/IManager";

export class ManagerService extends HttpService<IManager> {
  private static managerService: ManagerService | undefined
  private static _url = "http://localhost:3000/manager"
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
    const resp = await axios.get(`${ManagerService._url}/byStore/${storeId}`)
    return resp.data as { resp: string, data?: IManager }
  }

}