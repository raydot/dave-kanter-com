import Link from 'next/link'

export default function Success() {
  return (
    <div className="container">
      <h1>Thank You!</h1>
      <p>Your message has been sent successfully. I&apos;ll get back to you as soon as possible.</p>
      <Link href="/" className="button">Back to Home</Link>
    </div>
  )
}
