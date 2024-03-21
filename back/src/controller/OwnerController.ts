import { Request, Response } from 'express';
import prisma from "../app.js";

abstract class OwnerController {
    static async getById(req: Request, res: Response) {
        const { ownerId } = req.params
        try {
            const owner = await prisma.owner.findUnique({ where: { id: ownerId } })
            if (owner) {
                res.status(201).json({ resp: "Sucess", data: owner })
                return
            }
            res.status(500).json({ resp: "Não foi possível carregar o proprietário" })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
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
export default OwnerController