import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
class StockController {
    static async getAll(req, res) {
        try {
            const managers = await prisma.stockStore.findMany({});
            if (!managers) {
                return res.json({ resp: "Estoques não encontrados" });
            }
            res.status(200).json({ resp: "Sucess", data: managers });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static async getByStoreId(req, res) {
        try {
            const { storeId } = req.params;
            const stock = await prisma.stockStore.findUnique({ where: { storeId: storeId } });
            if (!stock) {
                return res.json({ resp: "Estoque não encontrado" });
            }
            res.status(200).json({ resp: "Sucess", data: stock });
        }
        catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" });
        }
    }
    static create() {
        return {
            id: createUuid(),
            cone: 50,
            flavors: {
                create: [
                    {
                        id: createUuid(),
                        name: "Chocolate",
                        quantity: 10,
                    },
                    {
                        id: createUuid(),
                        name: "Baunilha",
                        quantity: 10,
                    },
                    {
                        id: createUuid(),
                        name: "Morango",
                        quantity: 10,
                    },
                ]
            },
        };
    }
}
export default StockController;
//# sourceMappingURL=StockController.js.map