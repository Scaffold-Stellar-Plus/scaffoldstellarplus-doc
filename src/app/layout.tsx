import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { ConditionalFooter } from "@/components/conditional-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Scaffold Stellar Plus - Build Stellar Soroban Smart Contracts",
  description: "Enhanced, production-ready fullstack boilerplate for building Stellar Soroban smart contracts with Next.js 14. Features zero-configuration dynamic contract detection, multi-wallet support, and powerful reusable hooks.",
  keywords: ["Stellar", "Soroban", "Smart Contracts", "Blockchain", "Next.js", "Web3"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
