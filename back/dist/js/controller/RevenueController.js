import prisma from '../app.js';
class RevenueController {
    static async get(req, res) {
        try {
            const { revenueId } = req.params;
            const revenue = await prisma.revenue.findUnique({ where: { id: revenueId } });
            if (!revenue) {
                return res.json({ resp: "Montante não encontrado" });
            }
            return res.status(200).json({ resp: "Success", data: revenue });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getByStoreId(req, res) {
        try {
            const { storeId } = req.params;
            const revenue = await prisma.revenue.findUnique({ where: { storeId } });
            if (!revenue) {
                return res.json({ resp: "Montante não encontrado" });
            }
            return res.status(200).json({ resp: "Success", data: revenue });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async put(req, res) {
        try {
            const { revenueId } = req.params;
            const { data } = req.body;
            const revenue = await prisma.revenue.update({ where: { id: revenueId }, data });
            return res.status(200).json({ resp: "Success", data: revenue });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default RevenueController;
//# sourceMappingURL=RevenueController.js.map