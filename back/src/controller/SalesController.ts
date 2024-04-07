import { Request, Response } from 'express';
import prisma from '../app.js';
import { IStore } from '../interface/IStore.js';
import { ISales } from '../interface/ISales.js';


abstract class SalesController {
	public static async putOrCreate(req: Request, res: Response) {
		const { data } = req.body as { data: ISales }
		try {
			let sales: ISales | null
			sales = await prisma.sales.findFirst({ where: { revenueId: data.id } })
			if (!sales) {
				const { id, ...newSales } = data
				sales = await prisma.sales.create({ data: { ...newSales } })
			} else {
				sales = await prisma.sales.update({ where: { revenueId: sales.revenueId }, data: { ...data } })
			}
			return res.status(201).json({ resp: "Success", data: sales })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
		}
	}


	public static async createSale(req: Request, res: Response) {
		const { data } = req.body as { data: ISales }
		try {
			const company = await prisma.sales.update({
				where: { id: data.revenueId }, data: {
					...data
				}
			})
			const sales = await prisma.sales.findUnique({ where: { id: data.id } })
			return res.status(201).json({ resp: "Success", data: sales })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
		}
	}


	static async put(req: Request, res: Response) {
		try {
			const { id } = req.params
			const { data } = req.body as { data: IStore }

			const checkSalesExist = await prisma.sales.findUnique({ where: { id } })
			if (checkSalesExist?.name !== data.name) {
				return res.json({ resp: "Vendas da loja não encontrada!" })
			}

			const sales = await prisma.sales.update({ where: { id }, data })

			return res.status(200).json({ resp: "Success", data: sales })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}


	static async getAllByRevenueId(req: Request, res: Response) {
		const { revenueId } = req.params
		try {
			const sales = await prisma.sales.findMany({ where: { revenueId: revenueId } })
			if (!sales) {
				return res.json({ resp: "Vendas da loja não encontradas" })
			}
			return res.status(200).json({ resp: "Success", data: sales })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}


	static async get(req: Request, res: Response) {
		try {
			const { id } = req.params
			const sales = await prisma.sales.findUnique({ where: { id } })
			if (!sales) {
				return res.json({ resp: "Vendas da loja não encontrada" })
			}
			return res.status(200).json({ resp: "Success", data: sales })
		} catch (error) {
			console.log(error);
			return res.json({ msg: "Ocorreu um erro no servidor" })
		}
	}

	static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params
			const sales = await prisma.sales.delete({ where: { id } })
			if (!sales) {
				return res.json({ resp: "Vendas da loja não encontrada" })
			}
			return res.status(200).json({ resp: "Success" })
		} catch (error) {
			console.log(error);
			return res.json({ resp: "Ocorreu um erro no servidor" })
		}
	}

}

function verifySlug(slug: string, lastChar: string) {
	if (isNaN(Number(lastChar))) {
		slug += "1"
	} else {
		slug += (Number(lastChar) + 1)
	}
	return slug
}
export default SalesController