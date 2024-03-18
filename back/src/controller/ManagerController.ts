import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Manager from '../models/Manager.js';
import createUuid from '../createUuidUtil.js';
interface RequestBodyPassword {
    myId: string;
    key: string
    myPassword: string
}
interface RequestBodyManager {
    idStore: string;
    email: string;
    password: string;
}
abstract class ManagerController {
    public static async createManager(req: Request<{}, {}, RequestBodyManager>, res: Response) {
        const { email, password, idStore } = req.body

        const userExist = await Manager.findOne({ where: { email: email } })
        if (userExist) {
            return res.json({ resp: "Este email já existe!" })
        }
        // create password
        try {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            //create user
            const manager = await Manager.create({ id: createUuid(), email, password: passwordHash, idStore })
            const managerId = manager.getDataValue('id')
            await manager.save()

            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!

            const token = jwt.sign({ id: managerId, }, secret, { expiresIn: "180" })
            const refresh = jwt.sign({ id: managerId, }, secretRefresh, { expiresIn: "30m" })
            res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, currentUser: { _id: managerId, name: name, email: email } })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
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
export default ManagerController