import Manager from '../models/Manager.js';
import RevenueStore from '../models/RevenueStore.js';
import createUuid from '../createUuidUtil.js';
class RevenueController {
    static async create() {
        try {
            const revenue = await RevenueStore.create({ id: createUuid(), cash: 1000, expenses: 0, profit: 0 });
            const revenueId = revenue.getDataValue('id');
            await revenue.save();
            return revenueId;
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
export default RevenueController;
//# sourceMappingURL=RevenueController.js.map