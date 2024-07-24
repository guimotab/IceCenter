
import { IManager } from "@/interface/IManager";
import { IStockStore } from "@/interface/IStockStore";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { stockId: string }
}

export async function PUT(res: Request, { params }: IParamsProps) {
  const { ...data } = await res.json() as IStockStore
  const { stockId } = params
  try {
    const stock = await prisma.stockStore.update({ where: { id: stockId }, data })

    return NextResponse.json({ resp: "Success", data: stock })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}