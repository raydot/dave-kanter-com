'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from './actions'
import styles from './layout.module.css'

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
  // /admin/login and /admin/enroll are the only routes reachable without a
  // session (enroll only when the ADMIN_ENROLL_OPEN bypass is on) — neither
  // should show the authenticated nav or sign-out control.
  const isPreAuthPage = pathname === '/admin/login' || pathname === '/admin/enroll'
  const visible = isPreAuthPage ? [] : navItems.filter((item) => item.href !== pathname)

  return (
    <div style={{ padding: '1.5rem' }}>
      <nav className="tw-border-b tw-border-border tw-px-4 tw-py-3">
        <div className={styles.nav}>
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

          {!isPreAuthPage && (
            <form action={logout} className={styles.signOutForm}>
              <button type="submit" className={styles.signOut}>
                Sign out
              </button>
            </form>
          )}
        </div>
      </nav>
      {children}
    </div>
  )
}
