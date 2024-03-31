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
				return res.json({ resp: "Esta loja já existe!" })
			}
			const company = await prisma.company.update({
				where: { id: data.companyId }, data: {
					storeId: data.id,
					store: {
						create: {
							id: data.id,
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
export default StoreController