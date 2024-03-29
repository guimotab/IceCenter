import { v4 as uuid } from 'uuid';
import prisma from '../app.js';
class AddressController {
    static create({ cep, city, neighborhood, number, street, uf }) {
        return { id: uuid(), cep, city, neighborhood, number, street, uf };
    }
    static async getAll(req, res) {
        try {
            const addresses = await prisma.address.findMany({});
            if (!addresses) {
                return res.json({ resp: "Endereços não encontrados" });
            }
            res.status(200).json({ resp: "Success", data: addresses });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async put(req, res) {
        try {
            const { addressId } = req.params;
            const { data } = req.body;
            const address = await prisma.address.update({ where: { id: addressId }, data });
            res.status(200).json({ resp: "Success", data: address });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getByStoreId(req, res) {
        try {
            const { storeId } = req.params;
            const address = await prisma.address.findUnique({ where: { storeId } });
            if (!address) {
                return res.json({ resp: "Endereço não encontrado" });
            }
            res.status(200).json({ resp: "Success", data: address });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default AddressController;
//# sourceMappingURL=AddressController.js.map