'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'New Post', href: '/admin/new' },
  { label: 'All Posts', href: '/admin/posts' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const visible = navItems.filter((item) => item.href !== pathname)

  return (
    <div style={{ padding: '1.5rem' }}>
      <nav className="tw-border-b tw-border-border tw-px-4 tw-py-3">
        <div className="tw-max-w-3xl tw-mx-auto tw-flex tw-items-center tw-gap-4">
          {visible.map((item, i) => (
            <span key={item.href} className="tw-flex tw-items-center tw-gap-4">
              {i > 0 && <span className="tw-text-muted-foreground" style={{ padding: '0 0.5rem' }}>|</span>}
              <Link
                href={item.href}
                className="tw-text-sm tw-font-medium hover:tw-text-primary"
              >
                {item.label}
              </Link>
            </span>
          ))}
        </div>
      </nav>
      {children}
    </div>
  )
}
