import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags?: string[]
  publish?: boolean
  content: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('publish', true)
    .order('published_at', { ascending: false })

  if (error || !data) return []

  return data.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.published_at,
    excerpt: post.excerpt,
    tags: post.tags || [],
    publish: post.publish,
    content: post.content,
  }))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  return {
    slug: data.slug,
    title: data.title,
    date: data.published_at,
    excerpt: data.excerpt,
    tags: data.tags || [],
    publish: data.publish,
    content: data.content,
  }
}
