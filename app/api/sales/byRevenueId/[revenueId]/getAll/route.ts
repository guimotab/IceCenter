
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { revenueId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { revenueId } = params
  try {
    const sales = await prisma.sales.findMany({ where: { revenueId } })
    if (!sales) {
      return NextResponse.json({ resp: "Vendas da loja não encontradas" })
    }
    return NextResponse.json({ resp: "Success", data: sales })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde" })
  }
}