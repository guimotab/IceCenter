import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
import { IManager } from '../interface/IManager.js';
interface RequestBodyPassword {
    myId: string;
    key: string
    myPassword: string
}
interface RequestBodyManager {
    storeId: string;
    email: string;
    password: string;
}
abstract class ManagerController {
    static async get(req: Request, res: Response) {
        try {
            const { managerId } = req.params as { managerId: string }
            const manager = await prisma.manager.findUnique({ where: { id: managerId } })
            if (!manager) {
                return res.json({ resp: "Gerente não encontrado" })
            }
            res.status(200).json({ resp: "Sucess", data: manager })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }

    static async put(req: Request, res: Response) {
		try {
			const { managerId } = req.params
			const { data } = req.body as { data: IManager }

			const manager = await prisma.manager.update({ where: { id: managerId }, data })

			res.status(200).json({ resp: "Sucess", data: manager })
		} catch (error) {
			console.log(error);
			res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}
    public static async createManager(req: Request<{}, {}, RequestBodyManager>, res: Response) {
        const { email, password, storeId } = req.body

        const userExist = await prisma.manager.findUnique({ where: { email } })
        if (userExist) {
            return res.json({ resp: "Este email já existe!" })
        }
        // create password
        try {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            //create user
            const manager = await prisma.manager.create({ data: { id: createUuid(), email, password: passwordHash, storeId } })

            res.status(201).json({ resp: "Sucess", data: manager })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }
    }
    static async getAll(req: Request, res: Response) {
        try {
            const managers = await prisma.manager.findMany({})
            if (!managers) {
                return res.json({ resp: "Gerentes não encontrados" })
            }
            res.status(200).json({ resp: "Sucess", data: managers })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    static async getByStoreId(req: Request, res: Response) {
        try {
            const { storeId } = req.params
            const manager = await prisma.manager.findUnique({ where: { storeId } })
            if (!manager) {
                return res.json({ resp: "Gerente não encontrado" })
            }
            res.status(200).json({ resp: "Sucess", data: manager })
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
export default ManagerController