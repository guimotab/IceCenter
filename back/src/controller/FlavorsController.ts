import { Request, Response } from 'express';
import createUuid from '../util/createUuidUtil.js';
import { IFlavorsIceCream } from '../interface/IFlavorsIceCream.js';
import prisma from '../app.js';


abstract class FlavorsController {
    public static async create({ name, quantity, stockId }: IFlavorsIceCream) {
        try {
            const flavor = await prisma.flavorsIceCream.create({
                data: {
                    id: createUuid(),
                    name,
                    quantity,
                    stockId
                }
            })
            return flavor.id
        } catch (error) {
            console.log(error);
        }
    }
    static async getAll(req: Request, res: Response) {
        try {
            const managers = await prisma.flavorsIceCream.findMany({})
            if (!managers) {
                return res.json({ resp: "Gerentes não encontrados" })
            }
            res.status(200).json({ resp: "Sucess", data: managers })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    static async getAllByStockId(req: Request, res: Response) {
        try {
            const { stockId } = req.params
            const flavorsIceCream = await prisma.flavorsIceCream.findMany({ where: { stockId } })
            if (!flavorsIceCream) {
                return res.json({ resp: "Sabores não encontrados" })
            }
            res.status(200).json({ resp: "Sucess", data: flavorsIceCream })
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
export default FlavorsController