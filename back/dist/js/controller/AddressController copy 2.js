import Manager from '../models/Manager';
import Address from '../models/Address';
class AddressController {
    static async create({ cep, city, neighborhood, number, street, uf }) {
        try {
            const address = await Address.create({ cep, city, neighborhood, number, street, uf });
            const addressId = address.getDataValue('id');
            await address.save();
            return addressId;
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
export default AddressController;
//# sourceMappingURL=AddressController%20copy%202.js.map