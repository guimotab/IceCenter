import prisma from '../app.js';
class SalesController {
    static async createSale(req, res) {
        const { data } = req.body;
        try {
            const sales = await prisma.sales.create({ data });
            return res.status(201).json({ resp: "Success", data: sales });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async createManySales(req, res) {
        const { data } = req.body;
        try {
            const sales = await prisma.sales.createMany({ data });
            return res.status(201).json({ resp: "Success", data: sales });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async getAllByRevenueId(req, res) {
        const { revenueId } = req.params;
        try {
            const sales = await prisma.sales.findMany({ where: { revenueId: revenueId } });
            if (!sales) {
                return res.json({ resp: "Vendas da loja não encontradas" });
            }
            return res.status(200).json({ resp: "Success", data: sales });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async get(req, res) {
        try {
            const { id } = req.params;
            const sales = await prisma.sales.findUnique({ where: { id } });
            if (!sales) {
                return res.json({ resp: "Vendas da loja não encontrada" });
            }
            return res.status(200).json({ resp: "Success", data: sales });
        }
        catch (error) {
            console.log(error);
            return res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
}
export default SalesController;
//# sourceMappingURL=SalesController.js.map