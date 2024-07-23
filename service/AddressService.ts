import { IAddress } from "@/interface/IAddress";
import { prisma } from "@/lib/prisma";

export class AddressService {
  private static addressService: AddressService | undefined
  
  private constructor() {}

  static getInstance() {
    if (!this.addressService) {
      this.addressService = new AddressService()
    }
    return this.addressService
  }

  async putData(addressId: string, data: IAddress) {
    try {
      const address = await prisma.address.update({ where: { id: addressId }, data })
      return { resp: "Success", data: address }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async getByStoreId(storeId: string) {
    try {
      const address = await prisma.address.findUnique({ where: { storeId } })
      if (!address) {
        return { resp: "Endereço não encontrado" }
      }
      return { resp: "Success", data: address }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }
}

