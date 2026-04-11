import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav className="tw-border-b tw-border-border tw-px-4 tw-py-3">
        <div className="tw-max-w-3xl tw-mx-auto tw-flex tw-items-center tw-gap-6">
          <Link
            href="/admin/new"
            className="tw-text-sm tw-font-medium hover:tw-text-primary"
          >
            New Post |{' '}
          </Link>
          <Link
            href="/admin/posts"
            className="tw-text-sm tw-font-medium hover:tw-text-primary"
          >
            All Posts
          </Link>
        </div>
      </nav>
      {children}
    </div>
  )
}
