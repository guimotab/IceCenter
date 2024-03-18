import jwt from 'jsonwebtoken';
import Manager from '../models/Manager.js';
import Store from '../models/Store.js';
import AddressController from './AddressController.js';
import RevenueController from './RevenueController.js';
import CompanyController from './CompanyController.js';
import StockController from './StockController.js';
import createUuid from '../createUuidUtil.js';
class StoreController {
    static async createStore(req, res) {
        const { name, address, idOwner } = req.body;
        try {
            const idAddress = await AddressController.create(address);
            const idRevenue = await RevenueController.create();
            const idStock = await StockController.create();
            const idCompany = await CompanyController.getByOwnerId(idOwner);
            if (idAddress && idRevenue && idStock && idCompany) {
                const store = await Store.create({ id: createUuid(), idAddress, idCompany, name, idRevenue, idStock });
                const storeId = store.getDataValue('id');
                await store.save();
                const secret = process.env.SECRET;
                const secretRefresh = process.env.REFRESH;
                const token = jwt.sign({ id: storeId, }, secret, { expiresIn: "180" });
                const refresh = jwt.sign({ id: storeId, }, secretRefresh, { expiresIn: "30m" });
                res.status(201).json({ resp: "Sucess", token: token, refresh: refresh, store: { id: storeId } });
            }
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
            const store = await Manager.findOne({ where: { idStore: idStore } });
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