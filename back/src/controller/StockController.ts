import { Request, Response } from 'express';
import createUuid from '../util/createUuidUtil.js';
import prisma from '../app.js';
import { IStockStore } from '../interface/IStockStore.js';

abstract class StockController {
    static async getAll(req: Request, res: Response) {
        try {
            const managers = await prisma.stockStore.findMany({})
            if (!managers) {
                return res.json({ resp: "Estoques não encontrados" })
            }
            return res.status(200).json({ resp: "Sucess", data: managers })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }

    static async getByStoreId(req: Request, res: Response) {
        try {
            const { storeId } = req.params
            const stock = await prisma.stockStore.findUnique({ where: { storeId: storeId } })
            if (!stock) {
                return res.json({ resp: "Estoque não encontrado" })
            }
            return res.status(200).json({ resp: "Sucess", data: stock })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    static async put(req: Request, res: Response) {
        try {
            const { stockId } = req.params
            const { data } = req.body as { data: IStockStore }

            const stock = await prisma.stockStore.update({ where: { id: stockId }, data })

            return res.status(200).json({ resp: "Sucess", data: stock })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    public static create() {
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
        }

    }

}
export default StockController