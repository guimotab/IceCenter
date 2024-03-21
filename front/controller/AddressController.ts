import { IAddress } from "@/interface/IAddress"
import { IStore } from "@/interface/IStore"
import { AddressService } from "@/service/AddressService"

export abstract class AddressController {
  private static addressService = AddressService.getInstance()
  static async getByStoreId(idCompany: string) {
    return await this.addressService.getByStoreId(idCompany)
  }

  static async get(id: string) {
    return await this.addressService.get(id)
  }

  static async put(id: string, data: IAddress) {
    await this.addressService.putData(id, data)
  }

  static async post(data: IAddress) {
    return await this.addressService.postData("create", data)
  }

  static async delete(id: string) {
    await this.addressService.deleteData(id)
  }


}