import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dave Kanter - Staff Frontend Engineer',
  description:
    'Staff Frontend Engineer specializing in React, Next.js, and AI integration. 20+ years building enterprise applications for Fortune 500 clients.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Dave Kanter - Staff Frontend Engineer',
    description: 'Staff Frontend Engineer | React, Next.js & AI Integration',
    url: 'https://davekanter.com',
    siteName: 'Dave Kanter Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dave Kanter - Staff Frontend Engineer',
    description: 'Staff Frontend Engineer | React, Next.js & AI Integration',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
