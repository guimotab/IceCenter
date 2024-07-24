import { prisma } from "@/lib/prisma"
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";
import { v4 as uuid } from 'uuid';


export async function POST(res: Request) {
  const { name, email, password } = await res.json()

  try {
    const owner = await prisma.owner.findUnique({ where: { email } })
    if (owner) {
      return NextResponse.json({ resp: "Esse email já está em uso!" })
    }

    const company = await prisma.company.findUnique({ where: { name } })
    if (company) {
      return NextResponse.json({ resp: "Esse nome já está em uso!" })
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const ownerId = uuid()
    const newCompany = await prisma.company.create({
      data: {
        id: uuid(),
        name,
        owner: {
          create: {
            id: ownerId,
            email,
            password: passwordHash
          }
        }
      }, include: {
        owner: true
      }
    })

    const secret = process.env.SECRET!
    const secretRefresh = process.env.REFRESH!

    const token = jwt.sign({ id: ownerId, }, secret, { expiresIn: "5m" })
    const refresh = jwt.sign({ id: ownerId, }, secretRefresh, { expiresIn: "30m" })

    return NextResponse.json({ resp: "Success", token: token, refresh: refresh, owner: newCompany.owner })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: error })
  }
}