import { Button } from "@/components/ui/button"
import { DialogHeader } from "@/components/ui/dialog"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import Link from "next/link"

const Home = () => {
  return (
    <main>
      <div>
        <div className="flex items-center gap-5">
          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Link href={""}>
            <Button>Adicionar Empresa</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home