import * as bcrypt from 'bcrypt';
import prisma from '../app.js';
class ManagerController {
    static async get(req, res) {
        try {
            const { managerId } = req.params;
            const manager = await prisma.manager.findUnique({ where: { id: managerId } });
            if (!manager) {
                return res.json({ resp: "Gerente não encontrado" });
            }
            return res.status(200).json({ resp: "Success", data: manager });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async put(req, res) {
        try {
            const { managerId } = req.params;
            const { data } = req.body;
            const manager = await prisma.manager.update({ where: { id: managerId }, data });
            return res.status(200).json({ resp: "Success", data: manager });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async createManager(req, res) {
        const { email, password, storeId } = req.body.data;
        const userExist = await prisma.manager.findUnique({ where: { email } });
        if (userExist) {
            return res.json({ resp: "Este email já existe!" });
        }
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const manager = await prisma.manager.create({ data: { email, password: passwordHash, storeId } });
            return res.status(201).json({ resp: "Success", data: manager });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async getAll(req, res) {
        try {
            const managers = await prisma.manager.findMany({});
            if (!managers) {
                return res.json({ resp: "Gerentes não encontrados" });
            }
            return res.status(200).json({ resp: "Success", data: managers });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getByStoreId(req, res) {
        try {
            const { storeId } = req.params;
            const manager = await prisma.manager.findUnique({ where: { storeId } });
            if (!manager) {
                return res.json({ resp: "Gerente não encontrado" });
            }
            return res.status(200).json({ resp: "Success", data: manager });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default ManagerController;
//# sourceMappingURL=ManagerController.js.map