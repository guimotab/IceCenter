
import * as bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";
import { IManager } from "@/interface/IManager";

export async function POST(res: Request) {
  const { email, password, storeId } = await res.json() as IManager

  try {
    const userExist = await prisma.manager.findUnique({ where: { email } })
    if (userExist) {
      return NextResponse.json({ resp: "Este email já existe!" })
    }
    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const manager = await prisma.manager.create({ data: { email, password: passwordHash, storeId } })

    return NextResponse.json({ resp: "Success", data: manager })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor!" })
  }
}
