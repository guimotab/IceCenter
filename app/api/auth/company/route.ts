import { prisma } from "@/lib/prisma"
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
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

    const token = jwt.sign({ id: ownerId, }, secret, { expiresIn: "1d" })

    cookies().set(`token-icecenter-company`, JSON.stringify({ token }))

    return NextResponse.json({ resp: "Success", token: token, owner: newCompany.owner })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: error })
  }
}

export async function DELETE(res: Request) {
  try {
    
    cookies().delete(`token-icecenter-company`)

    return NextResponse.json({ resp: "Success" })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: error })
  }
}