import Manager from '../models/Manager.js';
import createUuid from '../createUuidUtil.js';
import FlavorsIceCream from '../models/FlavorsIceCream.js';
class FlavorsController {
    static async create({ name, quantity }) {
        try {
            const flavor = await FlavorsIceCream.create({
                id: createUuid(),
                name,
                quantity
            });
            const flavorId = flavor.getDataValue('id');
            await flavor.save();
            return flavorId;
        }
        catch (error) {
            console.log(error);
        }
    }
    static async getAll(req, res) {
        try {
            const managers = await Manager.findAll({});
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
            const { idStore } = req.params;
            const manager = await Manager.findOne({ where: { idStore: idStore } });
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