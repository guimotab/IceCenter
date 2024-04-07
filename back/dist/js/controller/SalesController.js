import prisma from '../app.js';
class SalesController {
    static async putOrCreate(req, res) {
        const { data } = req.body;
        try {
            let sales;
            sales = await prisma.sales.findFirst({ where: { revenueId: data.id } });
            if (!sales) {
                const { id, ...newSales } = data;
                sales = await prisma.sales.create({ data: { ...newSales } });
            }
            else {
                sales = await prisma.sales.update({ where: { revenueId: sales.revenueId }, data: { ...data } });
            }
            return res.status(201).json({ resp: "Success", data: sales });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async createSale(req, res) {
        const { data } = req.body;
        try {
            const company = await prisma.sales.update({
                where: { id: data.revenueId }, data: {
                    ...data
                }
            });
            const sales = await prisma.sales.findUnique({ where: { id: data.id } });
            return res.status(201).json({ resp: "Success", data: sales });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
    static async put(req, res) {
        try {
            const { id } = req.params;
            const { data } = req.body;
            const checkSalesExist = await prisma.sales.findUnique({ where: { id } });
            if ((checkSalesExist === null || checkSalesExist === void 0 ? void 0 : checkSalesExist.name) !== data.name) {
                return res.json({ resp: "Vendas da loja não encontrada!" });
            }
            const sales = await prisma.sales.update({ where: { id }, data });
            return res.status(200).json({ resp: "Success", data: sales });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
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
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const sales = await prisma.sales.delete({ where: { id } });
            if (!sales) {
                return res.json({ resp: "Vendas da loja não encontrada" });
            }
            return res.status(200).json({ resp: "Success" });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
function verifySlug(slug, lastChar) {
    if (isNaN(Number(lastChar))) {
        slug += "1";
    }
    else {
        slug += (Number(lastChar) + 1);
    }
    return slug;
}
export default SalesController;
//# sourceMappingURL=SalesController.js.map