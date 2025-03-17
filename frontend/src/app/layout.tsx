import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../app/components/Navbar'
import Footer from '../app/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code & Creativity | Varish Sanghvi',
  description: 'Professional portfolio showcasing my work',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
