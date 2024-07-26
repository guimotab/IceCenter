import { Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/Header";
import { TokenService } from "@/service/TokenService";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tokenService = new TokenService()
  const resp = tokenService.get()
  if (!resp.data) {
    redirect(`/admin?erro=${resp.message}`)
  }

  return (
    <div className={inter.className}>
      <Header idUser={resp.data.id} />
      {children}
      <Toaster />
    </div>
  );
}
