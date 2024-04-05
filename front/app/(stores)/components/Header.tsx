import { StoreController } from "@/controller/StoreController"
import useCurrentStore from "@/state/hooks/useCurrentStore"
import { useUpdateCurrentStore } from "@/state/hooks/useUpdateCurrentStore"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

const Header = () => {
  const store = useCurrentStore()
  const setStore = useUpdateCurrentStore()
  const searchParams = useParams<{ slugStore: string }>()
  const router = useRouter()
  useEffect(() => {
    if (!store) {
      onPageLoad()
    }
  }, [])

  async function onPageLoad() {
    const result = await StoreController.getStoreBySlug(searchParams.slugStore)
    if (result && result.isOpen) {
      return setStore(result)
    }
    router.push("/not-found")
  }

  return (
    <header className="flex flex-col items-center w-full border-b min-h-16">
      <div className="flex items-center justify-between py-3 px-8 max-w-[80rem] w-full h-16">

        {store &&
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-7">

              <h1 className="text-xl font-semibold">
                {store.name}
              </h1>
              <div className="flex items-center gap-6">
                <Link href={``}>Button</Link>
                <Link href={`${store.slug}/contacts`}>Contatos</Link>
              </div>

            </div>

          </div>
        }
      </div>
    </header>
  )
}

export default Header