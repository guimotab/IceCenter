import { Inter } from "next/font/google";
import "../globals.css";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <Suspense fallback={<>Loading...</>}>
        <Header />
        {children}
        <Toaster />
      </Suspense>
    </div>
  );
}
