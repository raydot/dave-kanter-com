import './globals.css'
import '../styles/critical.css'

export const metadata = {
  title: 'Dave Kanter - Full-Stack Developer & Educator',
  description: 'Full-stack developer with 20+ years experience in enterprise applications, teaching at UC Berkeley, Parsons, and Academy of Art University. Specializing in Next.js, React, and AI.',
  keywords: 'full-stack developer, Next.js, React, JavaScript, web development, educator, UC Berkeley, AI, enterprise applications',
  authors: [{ name: 'Dave Kanter' }],
  creator: 'Dave Kanter',
  publisher: 'Dave Kanter',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1b1f22',
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
    <html lang="en">
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical background image - responsive */}
        <link rel="preload" href="/images/dhalia-768.webp" as="image" type="image/webp" media="(max-width: 768px)" />
        <link rel="preload" href="/images/dhalia-1024.webp" as="image" type="image/webp" media="(min-width: 769px) and (max-width: 1199px)" />
        <link rel="preload" href="/images/dhalia.webp" as="image" type="image/webp" media="(min-width: 1200px)" />
        
        {/* Preload critical Google Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,600;1,300;1,600&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,600;1,300;1,600&display=swap"
          />
        </noscript>
        
        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body>{children}</body>
    </html>
  )
}
