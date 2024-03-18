import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Manager from '../models/Manager';
import Store from '../models/Store';
class ManagerController {
    static async createStore(req, res) {
        const { email, password, idStore } = req.body;
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const manager = await Store.create({ email, password: passwordHash, idStore });
            const managerId = manager.getDataValue('id');
            await manager.save();
            const secret = process.env.SECRET;
            const secretRefresh = process.env.REFRESH;
            const token = jwt.sign({ id: managerId, }, secret, { expiresIn: "180" });
            const refresh = jwt.sign({ id: managerId, }, secretRefresh, { expiresIn: "30m" });
            res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, currentUser: { _id: managerId, name: name, email: email } });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async getAll(req, res) {
        try {
            const managers = await Manager.findAll({});
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
            const { idStore } = req.params;
            const manager = await Manager.findOne({ where: { idStore: idStore } });
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
//# sourceMappingURL=AdressController.js.map