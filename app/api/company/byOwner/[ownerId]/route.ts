
import { ICompany } from "@/interface/ICompany";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { ownerId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { ownerId } = params

  try {
    const company = await prisma.company.findUnique({ where: { ownerId } })
    if (!company) {
      return NextResponse.json({ resp: "Não foi possível carregar a empresa" })
    }
    return NextResponse.json({ resp: "Success", data: company })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
  }

}

export async function POST(res: Request, { params }: IParamsProps) {
  const { name } = await res.json() as ICompany
  const { ownerId } = params

  try {
    const company = await prisma.company.create({ data: { name, ownerId } })
    return NextResponse.json({ resp: "Success", data: company })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" })
  }

}
