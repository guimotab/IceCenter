import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid';
import prisma from '../app.js';

interface RequestBody {
    name: string
    email: string;
    password: string;
}
interface RequestBodyManager {
    email: string;
    password: string;
}

abstract class AuthController {
    public static async register(req: Request<{}, {}, RequestBody>, res: Response) {
        const { name, email, password } = req.body
        try {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            //create user
            const ownerId = uuid()
            const company = await prisma.company.create({
                data: {
                    id: uuid(),
                    name,
                    owner: {
                        create: {
                            id: ownerId,
                            email,
                            password: passwordHash
                        }
                    }
                }, include: {
                    owner: true
                }
            })

            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!

            const token = jwt.sign({ id: ownerId, }, secret, { expiresIn: "5m" })
            const refresh = jwt.sign({ id: ownerId, }, secretRefresh, { expiresIn: "30m" })

            res.status(201).json({ resp: "Success", token: token, refresh: refresh, owner: company.owner })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }
    }

    public static async login(req: Request<{}, {}, RequestBody>, res: Response) {
        const { email, password } = req.params as RequestBody
        //check if user exist
        const owner = await prisma.owner.findUnique({ where: { email: email } })
        if (!owner) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        //check if password match
        const checkPassword = await bcrypt.compare(password, owner.password)
        if (!checkPassword) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        try {
            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!
            const token = jwt.sign({ id: owner.id, }, secret, { expiresIn: "5m" })
            const refresh = jwt.sign({ id: owner.id, }, secretRefresh, { expiresIn: "30m" })
            res.status(200).json({ resp: "Success", token: token, refresh: refresh, owner: owner })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }

    }

    public static async loginManager(req: Request<{}, {}, RequestBodyManager>, res: Response) {
        const { email, password } = req.params as RequestBodyManager
        //check if user exist
            const manager = await prisma.manager.findUnique({ where: { email } })
        if (!manager) {
            return res.json({ resp: "Esse email não existe!" })
        }
        if (manager.email !== email) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        //check if password match
        const checkPassword = await bcrypt.compare(password, manager.password) 
        if (!checkPassword) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        try {
            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!
            const token = jwt.sign({ id: manager.id, }, secret, { expiresIn: "5m" })
            const refresh = jwt.sign({ id: manager.id, }, secretRefresh, { expiresIn: "30m" })
            res.status(200).json({ resp: "Success", token: token, refresh: refresh, manager: manager })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }

    }
}
export default AuthController