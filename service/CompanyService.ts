import { ICompany } from "@/interface/ICompany";
import { prisma } from "@/lib/prisma";

export class CompanyService {
  private static companyService: CompanyService | undefined

  private constructor() { }

  static getInstance() {
    if (!this.companyService) {
      this.companyService = new CompanyService()
    }
    return this.companyService
  }

  public static async postData({ ownerId, name }: ICompany) {
    try {
      const company = await prisma.company.create({ data: { name, ownerId } })
      return { resp: "Success", data: company }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }

  async getByOwnerId(ownerId: string) {
    try {
      const company = await prisma.company.findUnique({ where: { ownerId } })
      if (company) {
        return { resp: "Success", data: company }
      }
      return { resp: "Não foi possível carregar a empresa" }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }
}