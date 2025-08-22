// Critical CSS inlined below, non-critical CSS loaded asynchronously

export const metadata = {
  title: 'Dave Kanter - Technical Strategist, Team leader, Full-Stack Developer & Educator',
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
        
        {/* Preload critical background images for LCP optimization - prioritize mobile first */}
        <link rel="preload" href="/images/dhalia-768.webp" as="image" type="image/webp" media="(max-width: 768px)" fetchPriority="high" />
        <link rel="preload" href="/images/dhalia-1024.webp" as="image" type="image/webp" media="(min-width: 769px) and (max-width: 1199px)" />
        <link rel="preload" href="/images/dhalia.webp" as="image" type="image/webp" media="(min-width: 1200px)" />
        
        {/* Expanded critical CSS for immediate render */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *,*:before,*:after{box-sizing:border-box}
            html{font-size:18pt;background-color:#1b1f22;color:#ffffff;box-sizing:border-box;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.3) #1b1f22}
            body,input,select,textarea{color:#ffffff;font-family:"Source Sans Pro",sans-serif;font-weight:300;font-size:1rem;line-height:1.65}
            body{background-color:#1b1f22;margin:0;padding:0}
            h1,h2,h3,h4,h5,h6{color:#ffffff;font-weight:600;line-height:1.5;margin:0 0 1rem 0;text-transform:uppercase;letter-spacing:0.1rem}
            h1{font-size:2.75rem;line-height:1.3}
            h2{font-size:1.75rem;line-height:1.4}
            p{margin:0 0 1rem 0}
            a{transition:color 0.2s ease-in-out,background-color 0.2s ease-in-out,border-bottom-color 0.2s ease-in-out;border-bottom:dotted 1px rgba(255,255,255,0.5);color:inherit;text-decoration:none}
            a:hover{border-bottom-color:transparent;color:#ffffff}
            #header{display:flex;flex-direction:column;align-items:center;text-align:center;background-image:linear-gradient(to top,rgba(19,21,25,0.5),rgba(19,21,25,0.5)),url("/images/dhalia.webp");background-attachment:fixed;background-position:center center;background-repeat:no-repeat;background-size:cover;height:100vh;position:relative;cursor:default;transition:transform 0.5s ease-in-out,filter 0.5s ease-in-out,opacity 0.5s ease-in-out}
            #header h1{font-size:4.35rem;font-weight:600;line-height:1.1;margin:0 0 1rem 0;letter-spacing:0.225rem;text-transform:uppercase}
            #header p{font-size:1.25rem;margin:0;font-weight:300;letter-spacing:0.225rem;text-transform:uppercase}
            #header nav{margin:0}
            #header nav ul{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:2rem}
            #header nav ul li{display:block}
            #header nav ul li a{display:block;min-width:7.5rem;height:2.75rem;line-height:2.75rem;padding:0 1.25rem 0 1.45rem;text-transform:uppercase;letter-spacing:0.2rem;font-size:0.8rem;border-style:solid;border-color:#ffffff;border-top-width:1px;border-bottom-width:1px;border-left-width:1px;border-right-width:1px;color:#ffffff;text-decoration:none;transition:background-color 0.2s ease-in-out,color 0.2s ease-in-out}
            #header nav ul li a:hover{background-color:rgba(255,255,255,0.075)}
            #main{background-color:#2e3842;display:none;position:fixed;top:0;left:0;width:100%;height:100vh;align-items:center;justify-content:center;z-index:3;flex-direction:row}
            #footer{transition:opacity 0.2s ease-in-out;width:100%;max-width:100%;margin-top:2rem;text-align:center}
            #footer .copyright{letter-spacing:0.2rem;font-size:0.6rem;opacity:0.75;margin-bottom:0;text-transform:uppercase}
            #wrapper{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;position:relative;z-index:3;padding:4rem 2rem;width:100%;background:transparent}
            body.is-loading *{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important}
            body.is-article-visible #header{transform:scale(0.95);filter:blur(0.1rem);opacity:0}
            body.is-article-visible #footer{transform:scale(0.95);filter:blur(0.1rem);opacity:0}
            @media screen and (max-width: 736px){html{font-size:11pt}#header h1{font-size:1.75rem;line-height:1.4}#header h2{font-size:1.35rem;line-height:1.5}#wrapper{padding:2rem 1rem}}
            @media screen and (max-width: 480px){html{font-size:10pt}#wrapper{padding:1rem}#header nav ul{flex-direction:column;min-width:10rem;max-width:100%}#header nav ul li{border-left:0;border-top:0}#header nav ul li a{height:3rem;line-height:3rem;min-width:0;width:100%}}
          `
        }} />
        
        {/* Preload Google Fonts CSS and key font files to reduce chain depth */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,600;1,300;1,600&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        {/* Preload critical font files to eliminate additional requests */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/sourcesanspro/v22/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7lujVj9w.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/sourcesanspro/v22/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdu3cOWxw.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,300;0,600;1,300;1,600&display=swap"
          />
        </noscript>
        
        {/* Load non-critical CSS asynchronously */}
        <link
          rel="preload"
          href="/globals-non-critical.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="/globals-non-critical.css" />
        </noscript>
        
        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}
