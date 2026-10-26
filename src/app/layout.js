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
  metadataBase: new URL('https://davekanter.com'),
  title: {
    default:
      'Dave Kanter - AI Engineering Leader | Fullstack Systems Developer',
    template: '%s | Dave Kanter',
  },
  description:
    'AI engineering leader and fullstack systems developer with 20+ years of experience building with Next.js, React, and LLM systems. Also a longtime graduate educator.',
  keywords:
    'AI engineering, engineering leadership, fullstack developer, systems development, Next.js, React, JavaScript, LLM, graduate educator',
  authors: [{ name: 'Dave Kanter' }],
  creator: 'Dave Kanter',
  publisher: 'Dave Kanter',
  robots: 'index, follow',
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davekanter.com',
    title: 'Dave Kanter - AI Engineering Leader & Fullstack Systems Developer',
    description:
      'AI engineering leader and fullstack systems developer with 20+ years of experience building production web and AI systems. Also a longtime graduate educator.',
    siteName: 'Dave Kanter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dave Kanter - AI Engineering Leader & Fullstack Systems Developer',
    description:
      'AI engineering leader and fullstack systems developer with 20+ years of experience building production web and AI systems. Also a longtime graduate educator.',
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
