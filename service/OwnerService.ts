import { prisma } from "@/lib/prisma";

export class OwnerService {
  private static ownerService: OwnerService | undefined
  private constructor(url = "owner") { }
  static getInstance() {
    if (!this.ownerService) {
      this.ownerService = new OwnerService()
    }
    return this.ownerService
  }

  static async getById(ownerId: string) {
    try {
      const owner = await prisma.owner.findUnique({ where: { id: ownerId } })
      if (owner) {
        return { resp: "Success", data: owner }
      }
      return { resp: "Não foi possível carregar o proprietário" }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }
}