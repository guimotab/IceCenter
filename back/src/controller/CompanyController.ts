import { Request, Response } from "express"
import { ICompany } from '../interface/ICompany.js';
import prisma from "../app.js";
import { v4 as uuid } from 'uuid'


abstract class CompanyController {
    public static async create(req: Request<{}, {}, ICompany>, res: Response) {
        const { ownerId, name } = req.body as ICompany
        try {
            const company = await prisma.company.create({ data: { id: uuid(), name, ownerId } })
            res.status(201).json({ resp: "Success" })
            
            return company.id
        } catch (error) {
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
            console.log(error);
        }
    }
    static async getByOwnerId(req: Request, res: Response) {
        const { ownerId } = req.params
        try {
            const company = await prisma.company.findUnique({ where: { ownerId } })
            if (company) {
                res.status(201).json({ resp: "Success", data: company })
                return
            }
            res.status(500).json({ resp: "Não foi possível carregar a empresa" })
        } catch (error) {
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
            console.log(error);
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
export default CompanyController