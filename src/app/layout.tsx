import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const chakra = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Save streams indefinitely | vodsaver",
  description: "Save VODs indefinitely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta content="vodsaver" property="og:title" />
        <meta content="Save streams indefinitely" property="og:description" />
        <meta content="https://vodsaver.io" property="og:url" />
        <meta content="/og.png" property="og:image" />

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />

        <meta name="twitter:title" content="vodsaver" />
        <meta name="twitter:description" content="Save streams indefinitely" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:src" content="/og.png" />
      </head>
      <body className={chakra.className}>
        <Providers>
          <main className="flex min-h-screen flex-col">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
