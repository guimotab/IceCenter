import { CompanyController } from "@/controller/CompanyController"
import { OwnerController } from "@/controller/OwnerController"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import useCurrentOwner from "@/state/hooks/useCurrentOwner"
import { useUpdateCurrentCompany } from "@/state/hooks/useUpdateCurrentCompany"
import { useUpdateCurrentOwner } from "@/state/hooks/useUpdateCurrentOwner"
import { LocalStorageUtils } from "@/utils/LocalStorageUtils"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Header = () => {
  const owner = useCurrentOwner()
  const company = useCurrentCompany()
  const setOnwer = useUpdateCurrentOwner()
  const setCompany = useUpdateCurrentCompany()
  const router = useRouter()
  useEffect(() => {
    async function verify() {
      if (!owner) {
        const resultStorage = LocalStorageUtils.getOwner()
        if (resultStorage) {
          setOnwer(await OwnerController.findCurrent())
          setCompany(await CompanyController.findCurrent())
          return
        }
        router.push("/admin")
      }
    }
    verify()
  }, [])
  return (
    <header className="flex flex-col items-center w-full border-b border-primary">
      <div className="flex items-center justify-between py-3 px-8 max-w-[80rem] w-full">
        {owner && company ?
          <>
            <div className="flex items-center gap-7">
              <h1 className="text-2xl font-semibold">
                IceCenter
              </h1>
              <div className="flex items-center gap-6">
                <p>Home</p>
                <p>Lojas</p>
                <p>Nova Loja</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h2>
                {company.name}
              </h2>
              <Avatar>
                <div className="flex items-center justify-center w-10 h-10 bg-slate-300 rounded-full">
                  {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                  <AvatarFallback className="font-medium">{company.name[0].toLocaleUpperCase()}</AvatarFallback>
                </div>
              </Avatar>
            </div>
          </>
          : ""}
      </div>
    </header>
  )
}

export default Header