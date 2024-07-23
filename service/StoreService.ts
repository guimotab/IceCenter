import { IAddress } from "@/interface/IAddress";
import { IStore } from "@/interface/IStore";
import { prisma } from "@/lib/prisma";

export class StoreService {
  private static storeService: StoreService | undefined
  private constructor() { }
  static getInstance() {
    if (!this.storeService) {
      this.storeService = new StoreService()
    }
    return this.storeService
  }

  async getData(storeId: string) {
    try {
      const store = await prisma.store.findUnique({ where: { id: storeId } })
      if (!store) {
        return { resp: "Loja não encontrada" }
      }
      return { resp: "Success", data: store }
    } catch (error) {
      console.log(error);
      return { msg: "Ocorreu um erro no servidor" }
    }
  }

  async putData(storeId: string, data: IStore) {
    try {
      const checkStoreExist = await prisma.store.findUnique({ where: { name: data.name } })
      if (checkStoreExist && checkStoreExist.name !== data.name) {
        return { resp: "O nome da loja já está sendo usada!" }
      }

      const checkSlugExist = await prisma.store.findUnique({ where: { slug: data.slug } })
      if (checkSlugExist && checkSlugExist.slug !== data.slug) {
        return { resp: "O slug já está em uso!" }
      }

      const store = await prisma.store.update({ where: { id: storeId }, data })

      return { resp: "Success", data: store }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }
  async postData(data: IStore & { address: IAddress }) {
    // create password
    try {
      const checkStoreExist = await prisma.store.findUnique({ where: { name: data.name } })
      if (checkStoreExist) {
        return { resp: "O nome da loja já está sendo usada!" }
      }

      let slug = data.slug
      const checkSlugExist = await prisma.store.findUnique({ where: { slug: data.slug } })
      if (checkSlugExist) {
        const lastChar = checkSlugExist.slug[checkSlugExist.slug.length]
        slug = this.verifySlug(lastChar, lastChar)
      }

      const company = await prisma.company.update({
        where: { id: data.companyId }, data: {
          storeId: data.id,
          store: {
            create: {
              id: data.id,
              slug,
              name: data.name,
              address: { create: { ...data.address } },
              revenue: { create: { cash: 1000 } },
              stock: {
                create: {
                  cone: 50,
                  flavors: {
                    create: [
                      {
                        name: "Chocolate",
                        quantity: 10,
                      },
                      {
                        name: "Baunilha",
                        quantity: 10,
                      },
                      {
                        name: "Morango",
                        quantity: 10,
                      },
                    ]
                  },
                }
              },
            }
          },
        }
      })
      const store = await prisma.store.findUnique({ where: { id: data.id } })
      return { resp: "Success", data: store }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }

  static async deleteData(id: string) {
		try {
			const store = await prisma.store.delete({ where: { id } })
			if (!store) {
				return { resp: "Loja não encontrada" }
			}
			return { resp: "Success" }
		} catch (error) {
			console.log(error);
			return { resp: "Ocorreu um erro no servidor" }
		}
	}

  async getAllByCompanyId(companyId: string) {
    try {
      const store = await prisma.store.findMany({ where: { companyId } })
      if (!store) {
        return { resp: "Lojas não encontradas" }
      }
      return { resp: "Success", data: store }
    } catch (error) {
      console.log(error);
      return { resp: "Ocorreu um erro no servidor" }
    }
  }

  async getBySlug(slug: string) {
    try {
      const store = await prisma.store.findUnique({ where: { slug } })

      if (!store) {
        return { resp: "Loja não encontrada" }
      }
      return { resp: "Success", data: store }
    } catch (error) {
      console.log(error);
      return { msg: "Ocorreu um erro no servidor" }
    }
  }
  private verifySlug(slug: string, lastChar: string) {
    if (isNaN(Number(lastChar))) {
      slug += "1"
    } else {
      slug += (Number(lastChar) + 1)
    }
    return slug
  }
}

