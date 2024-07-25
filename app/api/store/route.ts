
import { IAddress } from "@/interface/IAddress";
import { IStore } from "@/interface/IStore";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { storeId: string }
}

export async function POST(res: Request, { params }: IParamsProps) {
  const { ...data } = await res.json() as IStore & { address: IAddress }

  // create password
  try {
    const checkStoreExist = await prisma.store.findUnique({ where: { name: data.name } })
    if (checkStoreExist) {
      return NextResponse.json({ resp: "O nome da loja já está sendo usada!" })
    }

    let slug = data.slug
    const checkSlugExist = await prisma.store.findUnique({ where: { slug: data.slug } })
    if (checkSlugExist) {
      const lastChar = checkSlugExist.slug[checkSlugExist.slug.length]
      slug = verifySlug(lastChar, lastChar)
    }

    const company = await prisma.company.update({
      where: { id: data.companyId }, data: {
        storeId: data.id,
        store: {
          create: {
            id: data.id,
            slug,
            name: data.name,
            address: { create: { ...data.address } },
            revenue: { create: { cash: 1000 } },
            stock: {
              create: {
                cone: 50,
                flavors: {
                  create: [
                    {
                      name: "Chocolate",
                      quantity: 10,
                    },
                    {
                      name: "Baunilha",
                      quantity: 10,
                    },
                    {
                      name: "Morango",
                      quantity: 10,
                    },
                  ]
                },
              }
            },
          }
        },
      }
    })
    const store = await prisma.store.findUnique({ where: { id: data.id } })
    return NextResponse.json({ resp: "Success", data: store })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}

function verifySlug(slug: string, lastChar: string) {
  if (isNaN(Number(lastChar))) {
    slug += "1"
  } else {
    slug += (Number(lastChar) + 1)
  }
  return slug
}