export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div id="blog-root" className="tw-min-h-screen tw-bg-background tw-text-foreground">{children}</div>
}
