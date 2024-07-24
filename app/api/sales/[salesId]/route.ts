
import { IManager } from "@/interface/IManager";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { salesId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { salesId } = params
  try {
    const sales = await prisma.sales.findUnique({ where: { id: salesId } })
    if (!sales) {
      return NextResponse.json({ resp: "Vendas da loja não encontrada" })
    }
    return NextResponse.json({ resp: "Success", data: sales })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}