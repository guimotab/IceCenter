import { IManager } from "@/interface/IManager";
import { prisma } from "@/lib/prisma";
import * as bcrypt from 'bcrypt'

export class ManagerService {
  private static managerService: ManagerService | undefined
  private constructor() { }

  static getInstance() {
    if (!this.managerService) {
      this.managerService = new ManagerService()
    }
    return this.managerService
  }

  static async putData(managerId: string, data: IManager) {
    try {
      const manager = await prisma.manager.update({ where: { id: managerId }, data })

      return { resp: "Success", data: manager }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  static async getData(managerId: string,) {
    try {
      const manager = await prisma.manager.findUnique({ where: { id: managerId } })
      if (!manager) {
        return { resp: "Gerente não encontrado" }
      }
      return { resp: "Success", data: manager }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async postData({ email, password, storeId }: IManager) {

    const userExist = await prisma.manager.findUnique({ where: { email } })
    if (userExist) {
      return { resp: "Este email já existe!" }
    }
    // create password
    try {
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      //create user
      const manager = await prisma.manager.create({ data: { email, password: passwordHash, storeId } })

      return { resp: "Success", data: manager }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }
  async getByStoreId(storeId: string) {
    try {
      const manager = await prisma.manager.findUnique({ where: { storeId } })
      if (!manager) {
        return { resp: "Gerente não encontrado" }
      }
      return { resp: "Success", data: manager }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

}