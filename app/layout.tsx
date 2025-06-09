import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ryoma Yamamoto's Academic CV",
  description: "Academic CV and portfolio of Ryoma Yamamoto, Master's Student in Materials Science",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            {children}
            <footer className="container mx-auto px-4 py-6 mt-12 text-center text-sm text-slate-600 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2">
                <span className="penguin-waddle">🐧</span>
                <span>© {new Date().getFullYear()} Dr. Jane Smith • Last Updated: June 2025</span>
                <span className="penguin-waddle penguin-delay-1">🐧</span>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
