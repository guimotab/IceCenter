import { Request, Response } from 'express';
import User from '../models/User.js';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
interface RequestBody {
    email: string;
    password: string;
}
interface RequestBodyPassword {
    id: string;
    userId: string
    password: string
}
interface RequestBodyChangeUser {
    id: string;
    role: string
}
interface RequestBodyUpdateUser {
    id: string;
    name: string
    email: string
    password?: string
}
export default abstract class AdminController {
    public static async login(req: Request<{}, {}, RequestBody>, res: Response) {
        const { email, password } = req.params as RequestBody
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ resp: "Email ou senha incorreta!" })
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.json({ resp: "Email ou senha incorreta!" })
        }
        try {
            const secret = process.env.SECRETADMIN!
            const secretRefresh = process.env.REFRESHADMIN!
            const token = jwt.sign({ id: user._id, }, secret, { expiresIn: "180" })
            const refresh = jwt.sign({ id: user._id, }, secretRefresh, { expiresIn: "30m" })
            res.status(200).json({ resp: "Sucess", token: token, refresh: refresh, currentUser: { _id: user._id, name: user.name, email: email, role: user.role } })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }

    }
    public static async deleteUser(req: Request<{}, {}, RequestBodyPassword>, res: Response) {
        const { id, userId, password } = req.params as RequestBodyPassword
        const saltToken = process.env.SALT!
        const passwordSalt = jwt.verify(password, saltToken) as string
        try {
            const user = await User.findOne({ _id: id })
            const checkPassword = await bcrypt.compare(passwordSalt, user!.password)
            if (!checkPassword) {
                return res.json({ resp: "Senha incorreta!" })
            }
            await User.deleteOne({ _id: userId })
            return res.json({ resp: "Sucess" })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro ao deleter o usuário!" })
        }
    }
    public static async changeRoleUser(req: Request<{}, {}, RequestBodyChangeUser>, res: Response) {
        const { id, role } = req.body
        try {
            const user = await User.findOne({ _id: id })
            user!.role = role
            await user!.save()
            return res.json({ resp: "Sucess" })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor. Tente novamente mais tarde!" })
        }
    }
    public static async updateUserInformations(req: Request<{}, {}, RequestBodyUpdateUser>, res: Response) {
        const { id, name, email, password } = req.body
        try {
            const user = await User.findOne({ _id: id })
            if (user) {
                const emailAlreadyUsed = await User.findOne({ email: email })
                if (emailAlreadyUsed) {
                    if (emailAlreadyUsed.email !== user.email) {
                        return res.json({ resp: "Este email já está em uso!" })
                    }
                }
                user.name = name
                user.email = email
                if (password) {
                    const salt = await bcrypt.genSalt(12)
                    const passwordHash = await bcrypt.hash(password, salt)
                    user.password = passwordHash
                }
                await user.save()
                return res.json({ resp: "Sucess" })
            }
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor. Tente novamente mais tarde!" })
        }
    }
}