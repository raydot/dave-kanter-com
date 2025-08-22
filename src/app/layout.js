import './globals.css'

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
    <html lang="en" >
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Inline critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html{font-size:18pt;background-color:#1b1f22;color:#ffffff}
            body,input,select,textarea{color:#ffffff;font-family:"Source Sans Pro",sans-serif;font-weight:300;font-size:1rem;line-height:1.65}
            body{background-color:#1b1f22;margin:0;padding:0}
            #header{display:flex;flex-direction:column;align-items:center;text-align:center;background-image:linear-gradient(to top,rgba(19,21,25,0.5),rgba(19,21,25,0.5)),url("/images/dhalia.webp");background-attachment:fixed;background-position:center center;background-repeat:no-repeat;background-size:cover;height:100vh;position:relative;cursor:default}
            #header h1{font-size:4.35rem;font-weight:600;line-height:1.1;margin:0 0 1rem 0;letter-spacing:0.225rem;text-transform:uppercase}
            #header p{font-size:1.25rem;margin:0;font-weight:300;letter-spacing:0.225rem;text-transform:uppercase}
            #header nav{margin:0}
            #header nav ul{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2rem}
            #header nav ul li{display:block}
            #header nav ul li a{display:block;min-width:7.5rem;height:2.75rem;line-height:2.75rem;padding:0 1.25rem 0 1.45rem;text-transform:uppercase;letter-spacing:0.2rem;font-size:0.8rem;border-style:solid;border-color:#ffffff;border-top-width:1px;border-bottom-width:1px;border-left-width:1px;border-right-width:1px;color:#ffffff;text-decoration:none;transition:background-color 0.2s ease-in-out,color 0.2s ease-in-out}
            #header nav ul li a:hover{background-color:rgba(255,255,255,0.075)}
            #main{background-color:#2e3842;display:none}
            body.is-loading *{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important}
          `
        }} />
        
        {/* Load non-critical Google Fonts asynchronously */}
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
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
