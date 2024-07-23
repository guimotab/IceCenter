"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Login() {
  return (
    <main className="flex flex-col items-center">

      <div className="flex flex-col gap-10 w-full h-full max-w-[70rem] py-12 px-6 z-10">

        <section className="flex flex-col items-center w-full gap-4">
          <div className="flex flex-col items-center gap-1 min-w-[20rem]">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">Bem vindos ao projeto IceCenter!</h1>
            <Label className="text-lg text-center">
              A ideia desse projeto é você poder gerenciar uma rede de sorvetes de maneira completa,
              <br className="hidden sm:block" /> desde a criação da empresa até a visualização da sua loja!
            </Label>
          </div>
          <Card>
            <img src="/assets/imagesBase/login.png" className="max-w-[60rem] w-full rounded-xl" alt="Teste" />
          </Card>
        </section>

        <Separator />

        <section className="flex flex-col gap-10 w-full">
          <h2 className="text-xl sm:text-2xl font-medium underline text-slate-500">Entenda o Passo a Passo (2 min)</h2>

          <div className="flex flex-col items-center w-full gap-6">
            <div className="space-y-1 self-start">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-semibold">Seja Dono de Sua Empresa e Franquias</h2>
                  <Link target="_blank" href={"admin/createCompany"} >
                    <Button >Criar empresa</Button>
                  </Link>
                </div>
                <Label className="text-lg">Crie uma empresas e crie quantas franquias você quiser de maneira intuitiva e prática!</Label>
              </div>
              <p className="text-base">Clicando no botão <span className="badge">"Criar empresa"</span> você poderá ir para página para cadastrar sua empresa e com ela, poder iniciar seu negócio.</p>
            </div>
            <Card>
              <img src="/assets/imagesBase/admin.png" className="max-w-[55rem] w-full rounded-xl" alt="" />
            </Card>
          </div>

          <Separator />

          <div className="flex flex-col items-center w-full gap-6">
            <div className="space-y-1 self-start">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-semibold">Gerencie Suas Franquias Com Perfil de Gerente</h3>
                <Link target="_blank" href={"manager/"} >
                  <Button >Gerenciar loja</Button>
                </Link>
              </div>
              <Label className="text-lg">Após a criação da sua franquia, você pode acessá-la utilizando o email e a senha cadastrada!</Label>
              <div>
                <p className="text-base">Ao criar uma franquia/loja pelo perfil de Administrador, você poderá acessar a sua loja
                  clicando no botão <span className="badge">"Gerenciar loja"</span> e entrar com seu email e senha cadastras.</p>
                <p className="text-base">No perfil da loja, você poderá gerenciar o estoque e as vendas, bem como abrir a loja, o que permitirá ela ser acessível na web pelo seu slug.</p>
              </div>
            </div>
            <Card>
              <img src="/assets/imagesBase/manager.png" className="max-w-[55rem] w-full rounded-xl" alt="" />
            </Card>
          </div>

          <Separator />

          <div className="flex flex-col items-center w-full gap-6">
            <div className="space-y-1 self-start">
              <h4 className="text-xl sm:text-2xl font-semibold">Abra Sua Loja Para o Mundo</h4>
              <Label className="text-lg">Acesse usa loja por uma url própria!</Label>
              <p className="text-base">Com a loja aberta, você e seus clientes podem acessá-la pela web, podendo adquirir seus sorvertes de maneira dinâmica.</p>
            </div>
            <Card>
              <img src="/assets/imagesBase/user.png" className="max-w-[55rem] w-full rounded-xl" alt="" />
            </Card>
          </div>

        </section>

      </div>
    </main>
  );
}
