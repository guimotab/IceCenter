import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class RevenueController {
    static create() {
        return { id: createUuid(), cash: 1000, expenses: 0, profit: 0 };
    }
    static async get(req, res) {
        try {
            const { revenueId } = req.params;
            const revenue = await prisma.revenue.findUnique({ where: { id: revenueId } });
            if (!revenue) {
                return res.json({ resp: "Montante não encontrado" });
            }
            res.status(200).json({ resp: "Sucess", data: revenue });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getByStoreId(req, res) {
        try {
            const { storeId } = req.params;
            console.log("🚀 ~ RevenueController ~ getByStoreId ~ storeId:", storeId);
            const revenue = await prisma.revenue.findUnique({ where: { storeId } });
            console.log("🚀 ~ RevenueController ~ getByStoreId ~ revenue:", revenue);
            if (!revenue) {
                return res.json({ resp: "Montante não encontrado" });
            }
            res.status(200).json({ resp: "Sucess", data: revenue });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default RevenueController;
//# sourceMappingURL=RevenueController.js.map