import './globals.css'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Dave Kanter',
  description:
    'Thoughts on AI/ML engineering, web development, and technical leadership from a Staff Frontend Engineer with 20+ years of experience.',
  openGraph: {
    title: 'Blog | Dave Kanter',
    description:
      'Thoughts on AI/ML engineering, web development, and technical leadership',
    url: 'https://davekanter.com/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="tw-min-h-screen tw-bg-background">
      <div className="tw-max-w-4xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-8 sm:tw-py-12">
        <nav className="tw-mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Home
            </Button>
          </Link>
        </nav>

        <header className="tw-mb-8 sm:tw-mb-12">
          <h1 className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-mb-3 sm:tw-mb-4">
            Race Condition
          </h1>
          <p className="tw-text-muted-foreground tw-text-base sm:tw-text-lg">
            Thoughts on AI/ML engineering, web development, and technical
            leadership
          </p>
        </header>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="tw-pt-6">
              <p className="tw-text-muted-foreground tw-text-center">
                No blog posts yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="tw-space-y-6">
            {posts.map((post, index) => (
              <div key={post.slug}>
                <Card className="hover:tw-shadow-lg tw-transition-shadow">
                  <CardHeader>
                    <div className="tw-flex tw-items-start tw-justify-between tw-gap-4">
                      <div className="tw-flex-1">
                        <Link href={`/blog/${post.slug}`}>
                          <CardTitle className="tw-text-2xl tw-mb-2 hover:tw-opacity-70 tw-transition-opacity tw-cursor-pointer">
                            {post.title}
                          </CardTitle>
                        </Link>
                        <CardDescription>
                          <time className="tw-text-sm">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        </CardDescription>
                      </div>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="tw-text-muted-foreground tw-mb-4">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline">Read more →</Button>
                    </Link>
                  </CardContent>
                </Card>
                {index < posts.length - 1 && <Separator className="tw-my-6" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
