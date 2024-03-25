import { Request, Response } from 'express';
import AddressController from './AddressController.js';
import { IAddress } from '../interface/IAddress.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
import { IStore } from '../interface/IStore.js';

interface RequestBodyManager {
	data: IStore & { address: IAddress }

}
abstract class StoreController {
	public static async createStore(req: Request<{}, {}, RequestBodyManager>, res: Response) {
		const { data } = req.body
		// create password
		try {
			const checkIfExist = await prisma.store.findUnique({ where: { name: data.name } })
			const idStore = createUuid()
			if (!checkIfExist) {
				const company = await prisma.company.update({
					where: { id: data.companyId }, data: {
						storeId: idStore,
						store: {
							create: [{
								id: idStore,
								name: data.name,
								address: { create: { ...AddressController.create(data.address) } },
								revenue: { create: { ...RevenueController.create() } },
								stock: { create: { ...StockController.create() } },
							}]
						},
					},
				})
				const store = await prisma.store.findUnique({ where: { id: idStore } })
				return res.status(201).json({ resp: "Sucess", data: store })
			}
			res.json({ resp: "Esta loja já existe!" })
		} catch (error) {
			console.log(error);
			res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
		}
	}

	static async put(req: Request, res: Response) {
		try {
			const { storeId } = req.params
			const { data } = req.body as { data: IStore }

			const store = await prisma.store.update({ where: { id: storeId }, data })

			res.status(200).json({ resp: "Sucess", data: store })
		} catch (error) {
			console.log(error);
			res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}

	static async getAllByIdCompany(req: Request, res: Response) {
		const { companyId } = req.params
		try {
			const store = await prisma.store.findMany({ where: { companyId } })
			if (!store) {
				return res.json({ msg: "Lojas não encontradas" })
			}
			res.status(200).json({ msg: "Sucess", data: store })
		} catch (error) {
			console.log(error);
			res.json({ msg: "Ocorreu um erro no servidor" })
		}
	}

	static async get(req: Request, res: Response) {
		try {
			const { storeId } = req.params
			const store = await prisma.store.findUnique({ where: { id: storeId } })
			if (!store) {
				return res.json({ msg: "Loja não encontrada" })
			}
			res.status(200).json({ msg: "Sucess", data: store })
		} catch (error) {
			console.log(error);
			res.json({ msg: "Ocorreu um erro no servidor" })
		}
	}
	static async delete(req: Request, res: Response) {
		try {
			const { storeId } = req.params
			const store = await prisma.store.delete({ where: { id: storeId } })
			if (!store) {
				return res.json({ msg: "Loja não encontrada" })
			}
			res.status(200).json({ msg: "Sucess"})
		} catch (error) {
			console.log(error);
			res.json({ msg: "Ocorreu um erro no servidor" })
		}
	}
	
	// static async deleteManager(req: Request<{}, {}, RequestBodyPassword>, res: Response) {
	//     const { myId, key, myPassword } = req.params as RequestBodyPassword
	//     const saltToken = process.env.SALT!
	//     const passwordSalt = jwt.verify(myPassword, saltToken) as string
	//     try {
	//         const user = await User.findOne({ _id: myId })
	//         const checkPassword = await bcrypt.compare(passwordSalt, user!.password)
	//         if (!checkPassword) {
	//             return res.json({ resp: "Senha incorreta!" })
	//         }
	//         const teste = await Key.deleteOne({ key: key })
	//         return res.json({ resp: "Sucess" })
	//     } catch (error) {
	//         console.log(error);
	//         return res.json({ resp: "Ocorreu um erro ao deleter a chave!" })
	//     }
	// }
}
export default StoreController