"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthController } from "@/controller/AuthController"
import { ManagerController } from "@/controller/ManagerController"
import { StoreController } from "@/controller/StoreController"
import { TokenService } from "@/service/TokenService"
import useCurrentManager from "@/state/hooks/useCurrentManager"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import { useUpdateCurrentManager } from "@/state/hooks/useUpdateCurrentManager"
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface HeaderProps {
  userId: string
}

const Header = ({ userId }: HeaderProps) => {
  const manager = useCurrentManager()
  const store = useCurrentStore()
  const setManager = useUpdateCurrentManager()
  const setStore = useUpdateCurrentStore()
  const router = useRouter()
  
  useEffect(() => {
    async function verify() {
      const manager = await ManagerController.get(userId)
      if (manager) {
        setManager(manager)
        const store = await StoreController.get(manager.storeId)
        if (store.data) {
          setStore(store.data)
          return
        }
      }
    }
    verify()
  }, [])

  function handleLogout() {
    AuthController.logoutCompany()
    router.push("/manager")
  }

  return (
    <header className="flex flex-col items-center w-full border-b">
      <div className="flex items-center justify-between py-3 px-8 sm:px-10 max-w-[80rem] w-full">
        {manager && store ?
          <>
            <div className="flex items-center gap-7">
              <h1 className="text-xl sm:text-2xl font-semibold">
                IceCenter
              </h1>
              <div className="flex items-center gap-6">
                <Link href={"store"} className="text-sm sm:text-base">Loja</Link>
                <Link href={"stock"} className="text-sm sm:text-base">Estoque</Link>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-3">
                  <h2 className="hidden sm:block">
                    {store.name}
                  </h2>
                  <Avatar>
                    <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-slate-300 rounded-full">
                      {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                      <AvatarFallback className="font-medium">{store.name[0].toLocaleUpperCase()}</AvatarFallback>
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