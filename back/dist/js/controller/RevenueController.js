import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class RevenueController {
    static create() {
        return { id: createUuid(), cash: 1000, expenses: 0, profit: 0 };
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
export default RevenueController;
//# sourceMappingURL=RevenueController.js.map