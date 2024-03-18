import { Request, Response } from 'express';
import Manager from '../models/Manager.js';
import StockStore from '../models/StockStore.js';
import createUuid from '../createUuidUtil.js';
import FlavorsController from './FlavorsController.js';


abstract class StockController {
    public static async create() {
        try {
            const flavor1 = await FlavorsController.create({ id: "", name: "Chocolate", quantity: 10 })
            const flavor2 = await FlavorsController.create({ id: "", name: "Baunilha", quantity: 10 })
            const flavor3 = await FlavorsController.create({ id: "", name: "Morango", quantity: 10 })

            const stock = await StockStore.create({
                id: createUuid(),
                cone: 50,
            }, )
            const stockId = stock.getDataValue('id')
            await stock.save()

            return stockId
        } catch (error) {
            console.log(error);
        }
    }
    static async getAll(req: Request, res: Response) {
        try {
            const managers = await Manager.findAll({})
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
            const { idStore } = req.params
            const manager = await Manager.findOne({ where: { idStore: idStore } })
            if (!manager) {
                return res.json({ msg: "Gerente não encontrado" })
            }
            res.status(200).json({ msg: "Sucess", manager: manager })
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
export default StockController