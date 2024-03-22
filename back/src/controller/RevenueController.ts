import { Request, Response } from 'express';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';


abstract class RevenueController {
    public static create() {
        return { id: createUuid(), cash: 1000, expenses: 0, profit: 0 }
    }
    static async get(req: Request, res: Response) {
        try {
            const { revenueId } = req.params
            const revenue = await prisma.revenue.findUnique({ where: { id: revenueId } })
            if (!revenue) {
                return res.json({ resp: "Montante não encontrado" })
            }
            res.status(200).json({ resp: "Sucess", data: revenue })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    static async getByStoreId(req: Request, res: Response) {
        try {
            const { storeId } = req.params
            console.log("🚀 ~ RevenueController ~ getByStoreId ~ storeId:", storeId)
            const revenue = await prisma.revenue.findUnique({ where: { storeId } })
            console.log("🚀 ~ RevenueController ~ getByStoreId ~ revenue:", revenue)
            if (!revenue) {
                return res.json({ resp: "Montante não encontrado" })
            }
            res.status(200).json({ resp: "Sucess", data: revenue })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
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
export default RevenueController