import '../globals.css'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '@/lib/blog'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Dave Kanter`,
    description: post.excerpt,
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const dateOpts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', dateOpts)
  const formattedUpdated = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-US', dateOpts)
    : null

  return (
    <div className="tw-min-h-screen tw-bg-background">
      <article className="tw-max-w-3xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-8 sm:tw-py-12">
        <nav className="tw-flex tw-gap-4 tw-mb-6 sm:tw-mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">← Site Home</Button>
          </Link>
          <Link href="/blog">
            <Button variant="ghost" size="sm">← Blog Index</Button>
          </Link>
        </nav>

        {/* Frontmatter metadata card */}
        <header style={{
          marginBottom: '2rem',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}>
          {/* Window chrome bar */}
          <div style={{
            background: '#252c34',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
            <span style={{ marginLeft: 8, fontSize: '11px', color: 'rgba(220,220,220,0.35)', fontFamily: 'monospace', letterSpacing: '0.03em' }}>
              {slug}.mdx
            </span>
          </div>
          {/* Metadata body */}
          <div style={{
            background: '#1e252c',
            padding: '16px 20px',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '13px',
            lineHeight: '1.9',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: '12px' }}>
              <span style={{ color: '#7daedf' }}>title:</span>
              <span style={{ color: '#dcdcdc', fontWeight: 600 }}>{post.title}</span>

              <span style={{ color: '#7daedf' }}>date:</span>
              <span style={{ color: '#b5cea8' }}>{formattedDate}</span>

              {formattedUpdated && formattedUpdated !== formattedDate && <>
                <span style={{ color: '#7daedf' }}>updated:</span>
                <span style={{ color: '#b5cea8' }}>{formattedUpdated}</span>
              </>}

              {post.excerpt && <>
                <span style={{ color: '#7daedf', alignSelf: 'start' }}>excerpt:</span>
                <span style={{ color: '#ce9178', fontStyle: 'italic' }}>&ldquo;{post.excerpt}&rdquo;</span>
              </>}

              {post.tags && post.tags.length > 0 && <>
                <span style={{ color: '#7daedf', alignSelf: 'start', paddingTop: '2px' }}>tags:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '2px' }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(125,174,223,0.12)',
                      border: '1px solid rgba(125,174,223,0.25)',
                      color: '#89b4fa',
                      borderRadius: '4px',
                      padding: '1px 8px',
                      fontSize: '11px',
                      fontFamily: "'Courier New', Courier, monospace",
                      letterSpacing: '0.02em',
                    }}>{tag}</span>
                  ))}
                </div>
              </>}
            </div>
          </div>
        </header>

        <div className="tw-prose tw-prose-invert tw-max-w-none tw-prose-headings:tw-text-foreground tw-prose-headings:font-bold tw-prose-h1:text-3xl tw-prose-h2:text-2xl tw-prose-h3:text-xl tw-prose-p:tw-text-foreground tw-prose-p:text-base tw-prose-p:leading-7 tw-prose-strong:tw-text-foreground tw-prose-li:tw-text-foreground tw-prose-a:text-primary tw-prose-a:no-underline hover:tw-prose-a:underline tw-prose-code:text-sm tw-prose-pre:bg-muted">
          {post.content.trim().startsWith('<')
            ? <div dangerouslySetInnerHTML={{ __html: post.content }} />
            : <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          }
        </div>

        <Separator className="tw-my-8 sm:tw-my-12" />

        <footer>
          <Link href="/blog">
            <Button variant="outline">← Back to Blog</Button>
          </Link>
        </footer>
      </article>
    </div>
  )
}
