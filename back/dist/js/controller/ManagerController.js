import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class ManagerController {
    static async createManager(req, res) {
        const { email, password, storeId } = req.body;
        const userExist = await prisma.manager.findUnique({ where: { email } });
        if (userExist) {
            return res.json({ resp: "Este email já existe!" });
        }
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const manager = await prisma.manager.create({ data: { id: createUuid(), email, password: passwordHash, storeId } });
            const secret = process.env.SECRET;
            const secretRefresh = process.env.REFRESH;
            const token = jwt.sign({ id: manager.id, }, secret, { expiresIn: "180" });
            const refresh = jwt.sign({ id: manager.id, }, secretRefresh, { expiresIn: "30m" });
            res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, currentUser: { _id: manager.id, name: name, email: email } });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async getAll(req, res) {
        try {
            const managers = await prisma.manager.findMany({});
            if (!managers) {
                return res.json({ msg: "Gerentes não encontrados" });
            }
            res.status(200).json({ msg: "Sucess", managers: managers });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
    static async getByStoreId(req, res) {
        try {
            const { storeId } = req.params;
            const manager = await prisma.manager.findUnique({ where: { storeId } });
            if (!manager) {
                return res.json({ msg: "Gerente não encontrado" });
            }
            res.status(200).json({ msg: "Sucess", manager: manager });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
}
export default ManagerController;
//# sourceMappingURL=ManagerController.js.map