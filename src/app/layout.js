import './globals.css'

export const metadata = {
  title: 'Dave Kanter - Frontend Developer',
  description: 'Senior frontend developer specializing in React, Node, CSS, and JAMStack development',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
