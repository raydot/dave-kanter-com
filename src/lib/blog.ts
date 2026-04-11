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

const POST_SELECT = 'id, slug, title, published_at, excerpt, tags, publish, content, post_tags(tags(name))'

function mapPost(post: Record<string, unknown>): BlogPost {
  const postTags = post.post_tags as Array<{ tags: { name: string } | null }> | null
  return {
    slug: post.slug as string,
    title: post.title as string,
    date: post.published_at as string,
    excerpt: post.excerpt as string,
    tags: postTags && postTags.length > 0
      ? postTags.map((pt) => pt.tags?.name).filter(Boolean) as string[]
      : (post.tags as string[] | null) ?? [],
    publish: post.publish as boolean,
    content: post.content as string,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('publish', true)
    .order('published_at', { ascending: false })

  if (error || !data) return []
  return data.map(mapPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return mapPost(data)
}
