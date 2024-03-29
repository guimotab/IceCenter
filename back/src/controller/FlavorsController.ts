import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid'
import { IFlavorsIceCream } from '../interface/IFlavorsIceCream.js';
import prisma from '../app.js';


abstract class FlavorsController {
    public static async create({ name, quantity, stockId }: IFlavorsIceCream) {
        try {
            const flavor = await prisma.flavorsIceCream.create({
                data: {
                    id: uuid(), 
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
            const flavors = await prisma.flavorsIceCream.findMany({ orderBy: { name: "desc" } })
            if (!flavors) {
                return res.json({ resp: "Sabores não encontrados" })
            }
            return res.status(200).json({ resp: "Success", data: flavors })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    static async getAllByStockId(req: Request, res: Response) {
        try {
            const { stockId } = req.params
            const flavorsIceCream = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } })
            if (!flavorsIceCream) {
                return res.json({ resp: "Sabores não encontrados" })
            }
            return res.status(200).json({ resp: "Success", data: flavorsIceCream })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    static async putAllByStockId(req: Request, res: Response) {
        try {
            const { stockId } = req.params
            const { data } = req.body as { data: IFlavorsIceCream[] }

            const flavors = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } })
            flavors.forEach(async flavor => {
                const findThisFlavor = data.find(dataFlavor => dataFlavor.id === flavor.id)
                if (findThisFlavor) {
                    await prisma.flavorsIceCream.update({ where: { id: flavor.id }, data: { ...findThisFlavor } })
                }
            })

            return res.status(200).json({ resp: "Success", data: flavors })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" })
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
    //         return res.json({ resp: "Success" })
    //     } catch (error) {
    //         console.log(error);
    //         return res.json({ resp: "Ocorreu um erro ao deleter a chave!" })
    //     }
    // }
}
export default FlavorsController