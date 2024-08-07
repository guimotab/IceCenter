import { IAddress } from "@/interface/IAddress"
import { IStore } from "@/interface/IStore"
import { AddressService } from "@/service/AddressService"

export abstract class AddressController {
  private static addressService = AddressService.getInstance()
  static async getByStoreId(idCompany: string) {
    const resp = await this.addressService.getByStoreId(idCompany)
    if(resp.data){
      return resp.data
    }
  }

  static async get(id: string) {
    return await this.addressService.get(id)
  }

  static async put(id: string, data: IAddress) {
    return await this.addressService.putData(id, data)
  }

  static async post(data: IAddress) {
    return await this.addressService.postData(data)
  }

  static async delete(id: string) {
    await this.addressService.deleteData(id)
  }


}