import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CompanyController } from "@/controller/CompanyController"
import { OwnerController } from "@/controller/OwnerController"
import { TokenService } from "@/service/TokenService"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import useCurrentOwner from "@/state/hooks/useCurrentOwner"
import { useUpdateCurrentCompany } from "@/state/hooks/useUpdateCurrentCompany"
import { useUpdateCurrentOwner } from "@/state/hooks/useUpdateCurrentOwner"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
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
      const tokenService = new TokenService()
      const resp = tokenService.get()
      if (resp.status) {
        const owner = await OwnerController.get(resp.data!.id)
        if (owner) {
          const company = await CompanyController.getByOwnerId(owner.id)
          if (company) {
            setOnwer(owner)
            setCompany(company)
            return
          }
        }
      }
      router.push(`/admin?erro=${resp.message}`)
    }
    verify()
  }, [])
  function handleLogout() {
    TokenService.deleteTokens()
    router.push("/admin")
  }
  return (
    <header className="flex flex-col items-center w-full border-b min-h-16">
      <div className="flex items-center justify-between py-3 px-8 max-w-[80rem] w-full">
        {owner && company ?
          <>
            <div className="flex items-center gap-7">
              <h1 className="text-2xl font-semibold">
                IceCenter
              </h1>
              <div className="flex items-center gap-6">
                <Link href={"/admin/stores"}>Lojas</Link>
                <Link href={"/admin/create-store"}>Nova Loja</Link>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
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
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>Deslogar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
          : ""}
      </div>
    </header>
  )
}

export default Header