import { v4 as uuid } from 'uuid';
import prisma from '../app.js';
class FlavorsController {
    static async create({ name, quantity, stockId }) {
        try {
            const flavor = await prisma.flavorsIceCream.create({
                data: {
                    id: uuid(),
                    name,
                    quantity,
                    stockId
                }
            });
            return flavor.id;
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getAll(req, res) {
        try {
            const flavors = await prisma.flavorsIceCream.findMany({ orderBy: { name: "desc" } });
            if (!flavors) {
                return res.json({ resp: "Sabores não encontrados" });
            }
            return res.status(200).json({ resp: "Success", data: flavors });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getAllByStockId(req, res) {
        try {
            const { stockId } = req.params;
            const flavorsIceCream = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } });
            if (!flavorsIceCream) {
                return res.json({ resp: "Sabores não encontrados" });
            }
            return res.status(200).json({ resp: "Success", data: flavorsIceCream });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async putAllByStockId(req, res) {
        try {
            const { stockId } = req.params;
            const { data } = req.body;
            const flavors = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } });
            flavors.forEach(async (flavor) => {
                const findThisFlavor = data.find(dataFlavor => dataFlavor.id === flavor.id);
                if (findThisFlavor) {
                    await prisma.flavorsIceCream.update({ where: { id: flavor.id }, data: { ...findThisFlavor } });
                }
            });
            return res.status(200).json({ resp: "Success", data: flavors });
        }
        catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default FlavorsController;
//# sourceMappingURL=FlavorsController.js.map