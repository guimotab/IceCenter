import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import prisma from '../app.js';
class AuthController {
    static async register(req, res) {
        const { email, password } = req.body;
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const owner = await prisma.owner.create({ data: { id: uuid(), email, password: passwordHash } });
            const secret = process.env.SECRET;
            const secretRefresh = process.env.REFRESH;
            const token = jwt.sign({ id: owner.id, }, secret, { expiresIn: "5m" });
            const tokenteste = jwt.verify(token, secret);
            console.log("🚀 ~ AuthController ~ login ~ tokenteste:", tokenteste);
            const refresh = jwt.sign({ id: owner.id, }, secretRefresh, { expiresIn: "30m" });
            res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, user: owner });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async login(req, res) {
        const { email, password } = req.params;
        const owner = await prisma.owner.findUnique({ where: { email: email } });
        if (!owner) {
            return res.json({ resp: "Email ou senha incorretos!" });
        }
        const checkPassword = await bcrypt.compare(password, owner.password);
        if (!checkPassword) {
            return res.json({ resp: "Email ou senha incorretos!" });
        }
        try {
            const secret = process.env.SECRET;
            const secretRefresh = process.env.REFRESH;
            const token = jwt.sign({ id: owner.id, }, secret, { expiresIn: "5m" });
            const refresh = jwt.sign({ id: owner.id, }, secretRefresh, { expiresIn: "30m" });
            res.status(200).json({ resp: "Sucess", token: token, refresh: refresh, owner: owner });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
}
export default AuthController;
//# sourceMappingURL=AuthController.js.map