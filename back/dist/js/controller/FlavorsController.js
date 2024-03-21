import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class FlavorsController {
    static async create({ name, quantity }) {
        try {
            const flavor = await prisma.flavorsIceCream.create({
                data: {
                    id: createUuid(),
                    name,
                    quantity,
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
export default FlavorsController;
//# sourceMappingURL=FlavorsController.js.map