"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { TbPlugConnectedX } from "react-icons/tb";

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
  return (
    <main className="flex flex-col items-center">
      <div className="py-40">
        <Card className="py-12 px-20 space-y-3">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-3">
              <TbPlugConnectedX className="text-7xl" />
              <Label className="text-2xl font-bold">Algo deu errado!</Label>
            </div>
            <Label className="text-base font-semibold">Possíveis soluções:</Label>
          </div>
          <div>
            <li>Verifique se o backend está rodando.</li>
            <li>Verifique sua conexão.</li>
          </div>
          <Button onClick={reset}>Recarregar</Button>
        </Card>
      </div>
    </main>
  )
}

export default ErrorPage