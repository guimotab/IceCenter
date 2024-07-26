import { cookies } from "next/headers";
import "../../globals.css";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";
import { TokenService } from "@/service/TokenService";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookiesData = cookies().get(`token-icecenter-company`)
  if (!cookiesData) {
    redirect(`/admin?erro=Login não realizado!`)
  }
  const value = JSON.parse(cookiesData.value) as { token: string }
  const token = TokenService.decodeCookie(value)
  if (!token.data) {
    redirect(`/admin?erro=${token.message}`)
  }

  return (
    <div >
      <Header userId={token.data.id} />
      {children}
      <Toaster />
    </div>
  );
}
