import { Request, Response } from 'express';
import prisma from '../app.js';
import { IStockStore } from '../interface/IStockStore.js';
import { v4 as uuid } from 'uuid'

abstract class StockController {
    static async getAll(req: Request, res: Response) {
        try {
            const managers = await prisma.stockStore.findMany({})
            if (!managers) {
                return res.json({ resp: "Estoques não encontrados" })
            }
            return res.status(200).json({ resp: "Success", data: managers })
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
            return res.status(200).json({ resp: "Success", data: stock })
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

            return res.status(200).json({ resp: "Success", data: stock })
        } catch (error) {
            console.log(error);
            return res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    public static create() {
        return {
            cone: 50,
            flavors: {
                create: [
                    {
                        name: "Chocolate",
                        quantity: 10,
                    },
                    {
                        name: "Baunilha",
                        quantity: 10,
                    },
                    {
                        name: "Morango",
                        quantity: 10,
                    },
                ]
            },
        }

    }

}
export default StockController