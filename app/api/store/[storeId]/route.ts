
import { IManager } from "@/interface/IManager";
import { IStockStore } from "@/interface/IStockStore";
import { IStore } from "@/interface/IStore";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { storeId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { storeId } = params
  try {
    const store = await prisma.store.findUnique({ where: { id: storeId } })
    if (!store) {
      return NextResponse.json({ resp: "Loja não encontrada" })
    }
    return NextResponse.json({ resp: "Success", data: store })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}

export async function DELETE(res: Request, { params }: IParamsProps) {
  const { storeId } = params

  try {
    const store = await prisma.store.delete({ where: { id: storeId } })
    if (!store) {
      return NextResponse.json({ resp: "Loja não encontrada" })
    }
    return NextResponse.json({ resp: "Success" })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}

export async function PUT(res: Request, { params }: IParamsProps) {
  const { ...data } = await res.json() as IStore
  const { storeId } = params

  try {
    const checkStoreExist = await prisma.store.findUnique({ where: { name: data.name } })
    if (checkStoreExist && checkStoreExist.name !== data.name) {
      return NextResponse.json({ resp: "O nome da loja já está sendo usada" })
    }

    const checkSlugExist = await prisma.store.findUnique({ where: { slug: data.slug } })
    if (checkSlugExist && checkSlugExist.slug !== data.slug) {
      return NextResponse.json({ resp: "O slug já está em uso!" })
    }

    const store = await prisma.store.update({ where: { id: storeId }, data })

    return NextResponse.json({ resp: "Success", data: store })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}