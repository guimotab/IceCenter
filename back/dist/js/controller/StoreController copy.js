import AddressController from './AddressController.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class StoreController {
    static async createStore(req, res) {
        const { name, address, companyId } = req.body;
        try {
            const checkIfExist = await prisma.store.findUnique({ where: { name } });
            const idStore = createUuid();
            if (!checkIfExist) {
                const company = await prisma.company.update({
                    where: { id: companyId }, data: {
                        storeId: idStore,
                        store: {
                            create: {
                                id: idStore,
                                name,
                                address: { create: { ...AddressController.create(address) } },
                                revenue: { create: { ...RevenueController.create() } },
                                stock: { create: { ...StockController.create() } },
                            }
                        }
                    }
                });
                const store = await prisma.store.findUnique({ where: { id: idStore } });
                return res.status(201).json({ resp: "Success", data: store });
            }
            res.status(500).json({ resp: "Esta loja já existe!" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async getAllByIdCompany(req, res) {
        const { companyId } = req.params;
        try {
            const store = await prisma.store.findMany({ where: { companyId } });
            if (!store) {
                return res.json({ msg: "Lojas não encontradas" });
            }
            res.status(200).json({ msg: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
    static async get(req, res) {
        try {
            const { storeId } = req.params;
            const store = await prisma.manager.findUnique({ where: { storeId: storeId } });
            if (!store) {
                return res.json({ msg: "Gerente não encontrado" });
            }
            res.status(200).json({ msg: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
}
export default StoreController;
//# sourceMappingURL=StoreController%20copy.js.map