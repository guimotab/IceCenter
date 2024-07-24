
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { stockId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { stockId } = params

  try {
    const flavorsIceCream = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } })
    if (!flavorsIceCream) {
      return NextResponse.json({ resp: "Sabores não encontrados" })
    }
    return NextResponse.json({ resp: "Success", data: flavorsIceCream })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor!" })
  }
}
