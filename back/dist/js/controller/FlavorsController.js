import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class FlavorsController {
    static async create({ name, quantity, stockId }) {
        try {
            const flavor = await prisma.flavorsIceCream.create({
                data: {
                    id: createUuid(),
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
            const managers = await prisma.flavorsIceCream.findMany({});
            if (!managers) {
                return res.json({ resp: "Gerentes não encontrados" });
            }
            res.status(200).json({ resp: "Sucess", data: managers });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getAllByStockId(req, res) {
        try {
            const { stockId } = req.params;
            const flavorsIceCream = await prisma.flavorsIceCream.findMany({ where: { stockId } });
            if (!flavorsIceCream) {
                return res.json({ resp: "Sabores não encontrados" });
            }
            res.status(200).json({ resp: "Sucess", data: flavorsIceCream });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default FlavorsController;
//# sourceMappingURL=FlavorsController.js.map