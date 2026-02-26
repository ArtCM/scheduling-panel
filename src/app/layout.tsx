'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { useState } from "react";
import { StoreProvider } from "@/components/providers/store-provider";
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <Toaster />
            <div className="flex">
              <div className={`hidden md:block transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'}`}>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              </div>
              <div className="md:hidden">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              </div>
              <div className="flex-1 flex flex-col min-h-screen">
                <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 bg-background">
                  {children}
                </main>
              </div>
            </div>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}






