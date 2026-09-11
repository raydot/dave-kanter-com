import Link from 'next/link'

// A post-submission confirmation page has no business in search results.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function Success() {
  return (
    <div className="container">
      <h1>Thank You!</h1>
      <p>Your message has been sent successfully. I&apos;ll get back to you as soon as possible.</p>
      <Link href="/" className="button">Back to Home</Link>
    </div>
  )
}
