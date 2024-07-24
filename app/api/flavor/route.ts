
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function GET(res: Request) {
  try {
    const flavors = await prisma.flavorsIceCream.findMany({ orderBy: { name: "desc" } })
    if (!flavors) {
      return NextResponse.json({ resp: "Sabores não encontrados" })
    }
    return NextResponse.json({ resp: "Success", data: flavors })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor!" })
  }
}
