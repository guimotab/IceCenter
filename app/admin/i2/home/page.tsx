"use client"
import { Button } from "@/components/ui/button"
import { CompanyController } from "@/controller/CompanyController"
import { OwnerController } from "@/controller/OwnerController"
import { ICompany } from "@/interface/ICompany"
import { IOwner } from "@/interface/IOwner"
import Link from "next/link"
import { useEffect, useState } from "react"

const Home = () => {
  const [owners, setOwners] = useState<IOwner[]>()
  const [companys, setCompanys] = useState<ICompany[]>()
  useEffect(() => {
    async function teste() {
      const [owner, company] = await Promise.all([OwnerController.getAll(), CompanyController.getAll()])
      setOwners(owner)
      setCompanys(company)
    }
    teste()
    console.log("teste");
    
  })
  return (
    <main className="w-screen h-screen">
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col max-w-[40rem] items-center gap-5">
          <div>
            <h1>Lojas Atuais</h1>
            <div>
              {owners ?
                owners.map(owner =>
                  <div>{owner.email}</div>
                )
                : ""
              }
              {companys ?
                companys.map(company =>
                  <div>{company.name}</div>
                ) : ""
              }
            </div>
          </div>
          <Link href={""}>
            <Button>Nova Loja</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home