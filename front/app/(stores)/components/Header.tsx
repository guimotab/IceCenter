import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CompanyController } from "@/controller/CompanyController"
import { OwnerController } from "@/controller/OwnerController"
import { StoreController } from "@/controller/StoreController"
import { TokenService } from "@/service/TokenService"
import useCurrentCompany from "@/state/hooks/useCurrentCompany"
import useCurrentOwner from "@/state/hooks/useCurrentOwner"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import { useUpdateCurrentCompany } from "@/state/hooks/useUpdateCurrentCompany"
import { useUpdateCurrentOwner } from "@/state/hooks/useUpdateCurrentOwner"
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

const Header = () => {
  const store = useCurrentStore()
  const setStore = useUpdateCurrentStore()
  const searchParams = useParams<{ nameStore: string }>()
  const router = useRouter()
  useEffect(() => {
    async function load() {
      const nameStore = searchParams.nameStore.replaceAll("-", " ")
      const result = await StoreController.getStoreBySlug(nameStore)
      if (result && result.isOpen) {
        return setStore(result)
      }
      router.push("/not-found")
    }
    if (!store) {
      load()
    }
  }, [])
  function handleLogout() {
    TokenService.deleteTokens()
    router.push("/admin")
  }
  return (
    <header className="flex flex-col items-center w-full border-b min-h-16">
      <div className="flex items-center justify-between py-3 px-8 max-w-[80rem] w-full">
        {store &&
          <div className="flex items-center gap-7">
            <h1 className="text-2xl font-semibold">
              {store.name}
            </h1>
            <div className="flex items-center gap-6">
              <Link href={``}>Sorvetes</Link>
              <Link href={`${store.slug}/contacts`}>Contatos</Link>
            </div>
          </div>
        }
      </div>
    </header>
  )
}

export default Header