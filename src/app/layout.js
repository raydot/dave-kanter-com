// Critical CSS inlined below, non-critical CSS loaded asynchronously

import { Source_Sans_3 } from 'next/font/google'
import { ConditionalAskDave } from '@/components/ConditionalAskDave'
import '@/styles/critical.css'

const sourceSans = Source_Sans_3({
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1b1f22',
}

export const metadata = {
  title:
    'Dave Kanter - Technical Strategist, Team leader, Full-Stack Developer & Educator',
  description:
    'Full-stack developer with 20+ years experience in enterprise applications, teaching at UC Berkeley, Parsons, and Academy of Art University. Specializing in Next.js, React, and AI.',
  keywords:
    'full-stack developer, Next.js, React, JavaScript, web development, educator, UC Berkeley, AI, enterprise applications',
  authors: [{ name: 'Dave Kanter' }],
  creator: 'Dave Kanter',
  publisher: 'Dave Kanter',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davekanter.com',
    title: 'Dave Kanter - Full-Stack Developer & Educator',
    description:
      'Full-stack developer with 20+ years experience in enterprise applications, teaching at UC Berkeley, Parsons, and Academy of Art University.',
    siteName: 'Dave Kanter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dave Kanter - Full-Stack Developer & Educator',
    description:
      'Full-stack developer with 20+ years experience in enterprise applications, teaching at UC Berkeley, Parsons, and Academy of Art University.',
    creator: '@raydot',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourceSans.className}>
      <head>
        {/* Load non-critical CSS */}
        <link rel="stylesheet" href="/globals-non-critical.css" />

        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <ConditionalAskDave />
      </body>
    </html>
  )
}
