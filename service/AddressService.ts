import { errorAxios, HttpService } from "./HttpService";
import axios from "axios";
import { IAddress } from "@/interface/IAddress";

export class AddressService extends HttpService<IAddress> {
  private static addressService: AddressService | undefined
  private constructor(url = "address") {
    super(url);
  }
  static getInstance() {
    if (!this.addressService) {
      this.addressService = new AddressService()
    }
    return this.addressService
  }

  async getByStoreId(storeId: string) {
    const resp = await axios.get(`${this._url}/byStore/${storeId}`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: IAddress }
  }
}

