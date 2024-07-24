
import { IManager } from "@/interface/IManager";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { revenueId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { revenueId } = params

  try {
    const revenue = await prisma.revenue.findUnique({ where: { id: revenueId } })
    if (!revenue) {
      return NextResponse.json({ resp: "Montante não encontrado" })
    }
    return NextResponse.json({ resp: "Success", data: revenue })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}

export async function PUT(res: Request, { params }: IParamsProps) {
  const { ...data } = await res.json() as IManager
  const { revenueId } = params

  try {
    const revenue = await prisma.revenue.update({ where: { id: revenueId }, data })

    return NextResponse.json({ resp: "Success", data: revenue })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}
