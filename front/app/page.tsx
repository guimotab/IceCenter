"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()

  return (
    <main className="flex flex-col">
      <div className="flex flex-col gap-4 items-center w-full h-full max-w-[60rem] py-3 px-6 z-10">
        <section className="flex flex-col w-full">
          <h1 className="text-xl font-semibold">Bem vindos ao IceCenter!</h1>
          <Label>A ideia desse projeto é você poder gerenciar uma rede de sorvetes de maneira completa, podendo até mesmo acessar onde sua loja será aberta!</Label>
        </section>

        <section className="flex flex-col gap-4 w-full">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Seja dono de sua empresa e franquias!</h2>
              <Link href={"admin/"} >
                <Button size={"sm"}>Criar empresa</Button>
              </Link>
            </div>
            <Label>Crie uma empresas e crie quantas franquias você quiser de maneira intuitiva e prática!</Label>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Gerencie suas franquias com perfil de gerente!</h3>
              <Link href={"admin/"} >
                <Button size={"sm"}>Gerenciar loja</Button>
              </Link>
            </div>
            <Label>Após a criação da sua franquia, você pode acessá-la utilizando o email e a senha cadastrada!</Label>
          </div>
          <div>
            <h4 className="text-lg font-medium">Visualize sua loja como cliente!</h4>
            <Label>Veja sua loja por uma url própria!</Label>
          </div>
        </section>
      </div>
    </main>
  );
}
