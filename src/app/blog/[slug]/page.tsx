import '../globals.css'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} | Dave Kanter`,
    description: post.excerpt,
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="tw-min-h-screen tw-bg-background">
      <article className="tw-max-w-3xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-8 sm:tw-py-12">
        <nav className="tw-flex tw-gap-4 tw-mb-6 sm:tw-mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Home
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              ← Blog
            </Button>
          </Link>
        </nav>

        <header className="tw-mb-6 sm:tw-mb-8">
          <h1 className="tw-text-3xl sm:tw-text-4xl lg:tw-text-5xl tw-font-bold tw-mb-3 sm:tw-mb-4">{post.title}</h1>
          <time className="tw-text-muted-foreground">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <Separator className="tw-mb-6 sm:tw-mb-8" />

        <div className="tw-prose tw-prose-slate dark:tw-prose-invert tw-max-w-none tw-prose-headings:font-bold tw-prose-h1:text-3xl tw-prose-h2:text-2xl tw-prose-h3:text-xl tw-prose-p:text-base tw-prose-p:leading-7 tw-prose-a:text-primary tw-prose-a:no-underline hover:tw-prose-a:underline tw-prose-code:text-sm tw-prose-pre:bg-muted">
          <MDXRemote source={post.content} />
        </div>

        <Separator className="tw-my-8 sm:tw-my-12" />

        <footer>
          <Link href="/blog">
            <Button variant="outline">
              ← Back to Blog
            </Button>
          </Link>
        </footer>
      </article>
    </div>
  )
}
