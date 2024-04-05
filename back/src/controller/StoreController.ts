import { Request, Response } from 'express';
import AddressController from './AddressController.js';
import { IAddress } from '../interface/IAddress.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import prisma from '../app.js';
import { IStore } from '../interface/IStore.js';
import { v4 as uuid } from 'uuid'

interface RequestBodyManager {
	data: IStore & { address: IAddress }

}
abstract class StoreController {
	public static async createStore(req: Request<{}, {}, RequestBodyManager>, res: Response) {
		const { data } = req.body

		// create password
		try {
			const checkStoreExist = await prisma.store.findUnique({ where: { name: data.name } })
			if (checkStoreExist) {
				return res.json({ resp: "O nome da loja já está sendo usada!" })
			}

			let slug = data.slug
			const checkSlugExist = await prisma.store.findUnique({ where: { slug: data.slug } })
			if (checkSlugExist) {
				const lastChar = checkSlugExist.slug[checkSlugExist.slug.length]
				slug = verifySlug(lastChar, lastChar)
			}

			const company = await prisma.company.update({
				where: { id: data.companyId }, data: {
					storeId: data.id,
					store: {
						create: {
							id: data.id,
							slug,
							name: data.name,
							address: { create: { ...AddressController.create(data.address) } },
							revenue: { create: { ...RevenueController.create() } },
							stock: { create: { ...StockController.create() } },
						}
					},
				}
			})
			const store = await prisma.store.findUnique({ where: { id: data.id } })
			return res.status(201).json({ resp: "Success", data: store })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
		}
	}


	static async put(req: Request, res: Response) {
		try {
			const { storeId } = req.params
			const { data } = req.body as { data: IStore }

			const checkStoreExist = await prisma.store.findUnique({ where: { name: data.name } })
			if (checkStoreExist?.name !== data.name) {
				return res.json({ resp: "O nome da loja já está sendo usada!" })
			}

			const checkSlugExist = await prisma.store.findUnique({ where: { slug: data.slug } })
			if (checkSlugExist?.slug !== data.slug) {
				return res.json({ resp: "O slug já está em uso!" })
			}

			const store = await prisma.store.update({ where: { id: storeId }, data })

			return res.status(200).json({ resp: "Success", data: store })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}


	static async getAllByIdCompany(req: Request, res: Response) {
		const { companyId } = req.params
		try {
			const store = await prisma.store.findMany({ where: { companyId } })
			if (!store) {
				return res.json({ resp: "Lojas não encontradas" })
			}
			return res.status(200).json({ resp: "Success", data: store })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}


	static async get(req: Request, res: Response) {
		try {
			const { storeId } = req.params
			const store = await prisma.store.findUnique({ where: { id: storeId } })
			if (!store) {
				return res.json({ resp: "Loja não encontrada" })
			}
			return res.status(200).json({ resp: "Success", data: store })
		} catch (error) {
			console.log(error);
			return res.json({ msg: "Ocorreu um erro no servidor" })
		}
	}

	static async getBySlug(req: Request, res: Response) {
		try {
			const { slug } = req.params
			const store = await prisma.store.findUnique({ where: { slug } })

			if (!store) {
				return res.json({ resp: "Loja não encontrada" })
			}
			return res.status(200).json({ resp: "Success", data: store })
		} catch (error) {
			console.log(error);
			return res.json({ msg: "Ocorreu um erro no servidor" })
		}
	}


	static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params
			const store = await prisma.store.delete({ where: { id } })
			if (!store) {
				return res.json({ resp: "Loja não encontrada" })
			}
			return res.status(200).json({ resp: "Success" })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}

}

function verifySlug(slug: string, lastChar: string){
	if (isNaN(Number(lastChar))) {
		slug += "1"
	} else {
		slug += (Number(lastChar) + 1)
	}
	return slug
}
export default StoreController