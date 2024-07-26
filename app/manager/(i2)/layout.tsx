import "../../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/Header";
import { TokenService } from "@/service/TokenService";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesData = cookies().get(`token-icecenter-manager`)
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
