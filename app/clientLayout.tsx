"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import Navbar from "@/components/navbar"
import Loading from "@/components/loading"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulating loading time
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Rupesh Mangalam | Software Developer</title>
        <meta name="description" content="Rupesh Mangalam - Software Developer Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Navbar />
              {children}
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
