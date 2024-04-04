"use client"
import { Inter } from "next/font/google";
import "../../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
