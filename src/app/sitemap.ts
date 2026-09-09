import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

// Without this, Next.js freezes the sitemap at build time — a new post
// wouldn't appear until the next deploy, defeating the point of building
// it from Supabase. Same 1h window as /blog/[slug].
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  return [
    {
      url: 'https://davekanter.com',
      priority: 1,
    },
    {
      url: 'https://davekanter.com/blog',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://davekanter.com/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.date),
    })),
  ]
}
