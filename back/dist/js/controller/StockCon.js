import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class AddressController {
    static create({ cep, city, neighborhood, number, street, uf }) {
        return { id: createUuid(), cep, city, neighborhood, number, street, uf };
    }
    static async getAll(req, res) {
        try {
            const addresses = await prisma.address.findMany({});
            if (!addresses) {
                return res.json({ resp: "Endereços não encontrados" });
            }
            res.status(200).json({ resp: "Sucess", data: addresses });
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
            res.status(200).json({ resp: "Sucess", data: address });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
}
export default AddressController;
//# sourceMappingURL=StockCon.js.map