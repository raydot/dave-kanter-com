import Link from 'next/link'

// Same shape as src/app/success/page.tsx: plain theme markup, no Header/Footer
// (those are wired to the homepage's article-overlay state) and no Tailwind
// (this route isn't under the blog content globs).
export default function NotFound() {
  return (
    <div className="container">
      <h1>404</h1>
      <p>This page doesn&apos;t exist.  Too bad!</p>
      <Link href="/" className="button">Back to Home</Link>
    </div>
  )
}
