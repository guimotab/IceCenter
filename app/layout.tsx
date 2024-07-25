import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <RecoilRoot>
          <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
        </RecoilRoot>
      </Suspense>
    </html >
  );
}
