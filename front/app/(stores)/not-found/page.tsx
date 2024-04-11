"use client"

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MdOutlineWifiFind } from "react-icons/md";
const pageNotFound = () => {

  return (
    <main className="flex flex-col items-center">
      <div className="w-fit py-10">
        <Card className="py-5 px-7 space-y-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <MdOutlineWifiFind className="text-3xl" />
              <Label className="text-xl font-bold">Página não encontrada</Label>
            </div>
            <Label className="text-base font-medium">Possíveis soluções:</Label>
          </div>
          <div>
            <li>Verifique sua conexão.</li>
            <li>Verifique a url digitada.</li>
            <li>A loja pode estar indisponível no momento.</li>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default pageNotFound