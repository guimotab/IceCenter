import { Request, Response } from "express"
import Company from '../models/Company.js';
import { ICompany } from '../interface/ICompany.js';
import createUuid from "../createUuidUtil.js";


abstract class CompanyController {
    public static async create(req: Request<{}, {}, ICompany>, res: Response) {
        const { idOwner, name } = req.body as ICompany
        try {
            const company = await Company.create({ id: createUuid(), idOwner, name })
            const companyId = company.getDataValue('id')
            await company.save() 
            res.status(201).json({ resp: "Sucess" })
            
            return companyId
        } catch (error) {
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
            console.log(error);
        }
    }
    static async getByOwnerId(idOwner: string) {
        try {
            const manager = await Company.findOne({ where: { idOwner: idOwner } })
            if (manager) {
                return manager.getDataValue("id")
            }
        } catch (error) {
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
    //         return res.json({ resp: "Sucess" })
    //     } catch (error) {
    //         console.log(error);
    //         return res.json({ resp: "Ocorreu um erro ao deleter a chave!" })
    //     }
    // }
}
export default CompanyController