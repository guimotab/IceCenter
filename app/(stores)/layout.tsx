"use client"
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
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<>Loading...</>}>
          <Header />
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
