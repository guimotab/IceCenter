import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Owner from '../models/Owner.js';
import { v4 as uuid } from 'uuid';

interface RequestBodyOwner {
    email: string;
    password: string;
}

abstract class AuthController {
    public static async register(req: Request<{}, {}, RequestBodyOwner>, res: Response) {
        const { email, password } = req.body
        try {
            const salt = await bcrypt.genSalt(12) 
            const passwordHash = await bcrypt.hash(password, salt)

            //create user
            const owner = await Owner.create({ id: uuid(), email, password: passwordHash })
            const ownerId = owner.getDataValue('id')
            await owner.save()

            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!

            const token = jwt.sign({ id: ownerId, }, secret, { expiresIn: "180" })
            const refresh = jwt.sign({ id: ownerId, }, secretRefresh, { expiresIn: "30m" })

            res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, id: ownerId })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }
    }

    public static async login(req: Request<{}, {}, RequestBodyOwner>, res: Response) {
        const { email, password } = req.params as RequestBodyOwner
        //check if user exist
        const user = await Owner.findOne({ where: { email: email } })
        if (!user) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        //check if password match
        const userId = user.getDataValue("id")
        const checkPassword = await bcrypt.compare(password, user.getDataValue("password"))
        if (!checkPassword) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        try {
            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!
            const token = jwt.sign({ id: userId, }, secret, { expiresIn: "180" })
            const refresh = jwt.sign({ id: userId, }, secretRefresh, { expiresIn: "30m" })
            res.status(200).json({ resp: "Sucess", token: token, refresh: refresh, currentUser: { id: userId } })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }

    }
}
export default AuthController