import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

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
