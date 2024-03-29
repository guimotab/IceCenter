import AddressController from './AddressController.js';
import RevenueController from './RevenueController.js';
import StockController from './StockController.js';
import prisma from '../app.js';
import { v4 as uuid } from 'uuid';
class StoreController {
    static async createStore(req, res) {
        const { data } = req.body;
        try {
            const checkIfExist = await prisma.store.findUnique({ where: { name: data.name } });
            const storeId = uuid();
            if (!checkIfExist) {
                const company = await prisma.company.update({
                    where: { id: data.companyId }, data: {
                        storeId: storeId,
                        store: {
                            create: {
                                id: storeId,
                                name: data.name,
                                address: { create: { ...AddressController.create(data.address) } },
                                revenue: { create: { ...RevenueController.create() } },
                                stock: { create: { ...StockController.create() } },
                            }
                        },
                    }
                });
                const store = await prisma.store.findUnique({ where: { id: storeId } });
                return res.status(201).json({ resp: "Success", data: store });
            }
            return res.json({ resp: "Esta loja já existe!" });
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
                return res.json({ msg: "Lojas não encontradas" });
            }
            return res.status(200).json({ msg: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            return res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
    static async get(req, res) {
        try {
            const { storeId } = req.params;
            const store = await prisma.store.findUnique({ where: { id: storeId } });
            if (!store) {
                return res.json({ msg: "Loja não encontrada" });
            }
            return res.status(200).json({ msg: "Success", data: store });
        }
        catch (error) {
            console.log(error);
            return res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
    static async delete(req, res) {
        try {
            const { name } = req.params;
            const store = await prisma.store.delete({ where: { name: name } });
            if (!store) {
                return res.json({ msg: "Loja não encontrada" });
            }
            return res.status(200).json({ msg: "Success" });
        }
        catch (error) {
            console.log(error);
            return res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
}
export default StoreController;
//# sourceMappingURL=StoreController.js.map