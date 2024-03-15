import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
import Key from '../models/Keys.js';
import { ManagerService } from '../service/ManagerService.js';

interface RequestBody {
    name: string;
    email: string;
    password: string;
    key: string
}

abstract class AuthController {
    public static async register(req: Request<{}, {}, RequestBody>, res: Response) {
        const { name, email, password, key } = req.body
        const manager = ManagerService.getInstance()
        const userKey = await Key.findOne({ key: key })
        if(!userKey){
            return res.json({ resp: "Chave inexistente!" })
        }
        if(userKey.active){
            return res.json({ resp: "Essa chave já foi usada!" })
        }
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.json({ resp: "Este email já existe!" })
        }
        // create password
        try {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            //create user
            const user = new User({
                name, email, password: passwordHash, role: "user"
            })
            userKey.active = true
            userKey.userId = user.id
            await userKey.save()
            await user.save()
            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!
            const token = jwt.sign({ id: user._id, }, secret, { expiresIn: "180" })
            const refresh = jwt.sign({ id: user._id, }, secretRefresh, { expiresIn: "30m" })
            res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, currentUser: { _id: user._id, name: name, email: email } })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }
    }
    public static async login(req: Request<{}, {}, RequestBody>, res: Response) {
        const { email, password } = req.params as RequestBody
        //check if user exist
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        //check if password match
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.json({ resp: "Email ou senha incorretos!" })
        }
        try {
            const secret = process.env.SECRET!
            const secretRefresh = process.env.REFRESH!
            const token = jwt.sign({ id: user._id, }, secret, { expiresIn: "180" })
            const refresh = jwt.sign({ id: user._id, }, secretRefresh, { expiresIn: "30m" })
            res.status(200).json({ resp: "Sucess", token: token, refresh: refresh, currentUser: { _id: user._id, name: user.name, email: email } })
        } catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
        }

    }
}
export default AuthController