import { Request, Response } from 'express';
import { IAddress } from '../interface/IAddress.js';
import prisma from '../app.js';

abstract class AddressController {
    public static create({ cep, city, neighborhood, number, street, uf }: IAddress) {
        return { cep, city, neighborhood, number, street, uf }
    }
    static async getAll(req: Request, res: Response) {
        try {
            const addresses = await prisma.address.findMany({})
            if (!addresses) {
                return res.json({ resp: "Endereços não encontrados" })
            } 
            res.status(200).json({ resp: "Success", data: addresses })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }

    static async put(req: Request, res: Response) {
        try {
            const { addressId } = req.params
            const { data } = req.body as { data: IAddress }

            const address = await prisma.address.update({ where: { id: addressId }, data })

            res.status(200).json({ resp: "Success", data: address })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }
    static async getByStoreId(req: Request, res: Response) {
        try {
            const { storeId } = req.params
            const address = await prisma.address.findUnique({ where: { storeId } })
            if (!address) {
                return res.json({ resp: "Endereço não encontrado" })
            }
            res.status(200).json({ resp: "Success", data: address })
        } catch (error) {
            console.log(error);
            res.json({ resp: "Ocorreu um erro no servidor" })
        }
    }

}
export default AddressController