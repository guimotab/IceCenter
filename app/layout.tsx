"use client"
import "./globals.css";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <Suspense>
        <RecoilRoot>
          <body suppressHydrationWarning={true}>{children}</body>
        </RecoilRoot>
      </Suspense>
    </html >
  );
}
