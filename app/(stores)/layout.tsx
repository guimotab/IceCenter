import "../globals.css";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
      <Suspense fallback={<>Loading...</>}>
        <Header />
        {children}
        <Toaster />
      </Suspense>
    </div>
  );
}
