
import { IFlavorsIceCream } from "@/interface/IFlavorsIceCream";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { stockId: string }
}

export async function PUT(res: Request, { params }: IParamsProps) {
  const data = await res.json() as IFlavorsIceCream[]
  const { stockId } = params

  try {
    const flavors = await prisma.flavorsIceCream.findMany({ where: { stockId }, orderBy: { name: "desc" } })
    flavors.forEach(async flavor => {
      const findThisFlavor = data.find(dataFlavor => dataFlavor.id === flavor.id)
      if (findThisFlavor) {
        await prisma.flavorsIceCream.update({ where: { id: flavor.id }, data: { ...findThisFlavor } })
      }
    })
    return NextResponse.json({ resp: "Success", data: flavors })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}

export async function POST(res: Request, { params }: IParamsProps) {
  const { name, quantity } = await res.json() as IFlavorsIceCream
  const { stockId } = params

  try {
    const flavor = await prisma.flavorsIceCream.create({
      data: {
        name,
        quantity,
        stockId
      }
    })
    return NextResponse.json({ resp: "Success", data: flavor.id })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor!" })
  }
}
