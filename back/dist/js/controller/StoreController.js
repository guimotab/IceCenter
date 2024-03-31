import AddressController from './AddressController.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import prisma from '../app.js';
class StoreController {
    static async createStore(req, res) {
        const { data } = req.body;
        try {
            const checkStoreExist = await prisma.store.findUnique({ where: { name: data.name } });
            if (checkStoreExist) {
                return res.json({ resp: "Esta loja já existe!" });
            }
            const company = await prisma.company.update({
                where: { id: data.companyId }, data: {
                    storeId: data.id,
                    store: {
                        create: {
                            id: data.id,
                            name: data.name,
                            address: { create: { ...AddressController.create(data.address) } },
                            revenue: { create: { ...RevenueController.create() } },
                            stock: { create: { ...StockController.create() } },
                        }
                    },
                }
            });
            const store = await prisma.store.findUnique({ where: { id: data.id } });
            return res.status(201).json({ resp: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async put(req, res) {
        try {
            const { storeId } = req.params;
            const { data } = req.body;
            const store = await prisma.store.update({ where: { id: storeId }, data });
            return res.status(200).json({ resp: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getAllByIdCompany(req, res) {
        const { companyId } = req.params;
        try {
            const store = await prisma.store.findMany({ where: { companyId } });
            if (!store) {
                return res.json({ resp: "Lojas não encontradas" });
            }
            return res.status(200).json({ resp: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async get(req, res) {
        try {
            const { storeId } = req.params;
            const store = await prisma.store.findUnique({ where: { id: storeId } });
            if (!store) {
                return res.json({ resp: "Loja não encontrada" });
            }
            return res.status(200).json({ resp: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            return res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const store = await prisma.store.delete({ where: { id } });
            if (!store) {
                return res.json({ resp: "Loja não encontrada" });
            }
            return res.status(200).json({ resp: "Success" });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default StoreController;
//# sourceMappingURL=StoreController.js.map