import jwt from 'jsonwebtoken';
import AddressController from './AddressController.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class StoreController {
    static async createStore(req, res) {
        const { name, address, companyId } = req.body;
        try {
            const store = await prisma.store.create({
                data: {
                    id: createUuid(),
                    name,
                    address: { create: { ...AddressController.create(address) } },
                    revenue: { create: { ...RevenueController.create() } },
                    stock: { create: { ...StockController.create() } },
                    companyId,
                }
            });
            const secret = process.env.SECRET;
            const secretRefresh = process.env.REFRESH;
            const token = jwt.sign({ id: store.id, }, secret, { expiresIn: "180" });
            const refresh = jwt.sign({ id: store.id, }, secretRefresh, { expiresIn: "30m" });
            res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, store: { id: store.id } });
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
            const store = await prisma.manager.findUnique({ where: { storeId: storeId } });
            if (!store) {
                return res.json({ msg: "Gerente não encontrado" });
            }
            res.status(200).json({ msg: "Sucess", store: store });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
}
export default StoreController;
//# sourceMappingURL=StoreController.js.map