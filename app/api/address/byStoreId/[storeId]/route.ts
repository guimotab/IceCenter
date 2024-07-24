
import { IAddress } from "@/interface/IAddress";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { addressId: string }
}

export async function PUT(res: Request, { params }: IParamsProps) {
  const { ...data } = await res.json() as IAddress
  const { addressId } = params

  try {
    const address = await prisma.address.update({ where: { id: addressId }, data })
    return NextResponse.json({ resp: "Success", data: address })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}
