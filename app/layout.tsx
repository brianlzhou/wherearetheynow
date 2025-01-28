import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import Sidebar from './components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fellowship Winners Explorer',
  description: 'Semantic search across multiple fellowship programs.',
  twitter: {
    card: "summary_large_image",
    title: "Fellowship Winners Explorer",
    description: "Semantic search across multiple fellowship programs.",
    creator: "@nabeelqu",
    images: ["https://www.mercatus.org/themes/custom/mercatus/images/mercatus-social-media.png"],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
