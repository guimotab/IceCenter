
import { IManager } from "@/interface/IManager";
import { ISales } from "@/interface/ISales";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { salesId: string }
}

export async function POST(res: Request, { params }: IParamsProps) {
  const { ...data } = await res.json() as ISales

  try {
    const sales = await prisma.sales.create({ data })
    return NextResponse.json({ resp: "Success", data: sales })
  } catch (error) {
    console.log(error);
      return NextResponse.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde" })
  }

}