import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import AddressController from './AddressController.js';
import { IAddress } from '../interface/IAddress.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';

interface RequestBodyManager {
	name: string;
	address: IAddress;
	companyId: string
}
abstract class StoreController {
	public static async createStore(req: Request<{}, {}, RequestBodyManager>, res: Response) {
		const { name, address, companyId } = req.body
		// create password
		try {

			const store = await prisma.store.create({
				data: {
					id: createUuid(),
					name,
					address: { create: { ...AddressController.create(address) } },
					revenue: { create: { ...RevenueController.create() } },
					stock: { create: { ...StockController.create() } },
					companyId,
				}
			})

			const secret = process.env.SECRET!
			const secretRefresh = process.env.REFRESH!

			const token = jwt.sign({ id: store.id, }, secret, { expiresIn: "180" })
			const refresh = jwt.sign({ id: store.id, }, secretRefresh, { expiresIn: "30m" })
			res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, store: { id: store.id } })
		} catch (error) {
			console.log(error);
			res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
		}
	}
	static async getAll(req: Request, res: Response) {
		try {
			const managers = await prisma.manager.findMany({})
			if (!managers) {
				return res.json({ msg: "Gerentes não encontrados" })
			}
			res.status(200).json({ msg: "Sucess", managers: managers })
		} catch (error) {
			console.log(error);
			res.json({ msg: "Ocorreu um erro no servidor" })
		}
	}
	static async getByStoreId(req: Request, res: Response) {
		try {
			const { storeId } = req.params
			const store = await prisma.manager.findUnique({ where: { storeId: storeId } })
			if (!store) {
				return res.json({ msg: "Gerente não encontrado" })
			}
			res.status(200).json({ msg: "Sucess", store: store })
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