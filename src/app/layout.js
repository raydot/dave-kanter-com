// Critical CSS inlined below, non-critical CSS loaded asynchronously

import { ConditionalAskDave } from '@/components/ConditionalAskDave'
import '@/styles/critical.css'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1b1f22',
}

export const metadata = {
  title: 'Dave Kanter - Technical Strategist, Team leader, Full-Stack Developer & Educator',
  description: 'Full-stack developer with 20+ years experience in enterprise applications, teaching at UC Berkeley, Parsons, and Academy of Art University. Specializing in Next.js, React, and AI.',
  keywords: 'full-stack developer, Next.js, React, JavaScript, web development, educator, UC Berkeley, AI, enterprise applications',
  authors: [{ name: 'Dave Kanter' }],
  creator: 'Dave Kanter',
  publisher: 'Dave Kanter',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davekanter.com',
    title: 'Dave Kanter - Full-Stack Developer & Educator',
    description: 'Full-stack developer with 20+ years experience in enterprise applications, teaching at UC Berkeley, Parsons, and Academy of Art University.',
    siteName: 'Dave Kanter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dave Kanter - Full-Stack Developer & Educator',
    description: 'Full-stack developer with 20+ years experience in enterprise applications, teaching at UC Berkeley, Parsons, and Academy of Art University.',
    creator: '@raydot',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts with proper preconnect */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,600;1,300;1,600&display=swap"
        />
        
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
