import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface BlogPost {
  slug: string
  title: string
  date: string
  updatedAt: string | null
  excerpt: string
  tags?: string[]
  publish?: boolean
  content: string
}

const POST_SELECT = 'id, slug, title, published_at, updated_at, excerpt, publish, content, post_tags(tags(name))'

function mapPost(post: Record<string, unknown>): BlogPost {
  const postTags = post.post_tags as Array<{ tags: { name: string } | null }> | null
  return {
    slug: post.slug as string,
    title: post.title as string,
    date: post.published_at as string,
    updatedAt: post.updated_at as string | null,
    excerpt: post.excerpt as string,
    tags: postTags ? postTags.map((pt) => pt.tags?.name).filter(Boolean) as string[] : [],
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

  // Deliberately throws rather than returning []. These run during ISR
  // regeneration, where an empty result would get cached as an empty blog
  // index, sitemap and feed for the full revalidate window. Throwing makes
  // Next keep serving the last good version instead.
  if (error) {
    throw new Error(`Failed to load posts: ${error.message}`)
  }

  return (data ?? []).map(mapPost)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('slug', slug)
    .eq('publish', true)
    .single()

  if (error) {
    // PGRST116 is "no rows matched" — a real 404, not a failure. Anything
    // else would otherwise cache a 404 over a live post for an hour.
    if (error.code === 'PGRST116') return null
    throw new Error(`Failed to load post "${slug}": ${error.message}`)
  }

  return data ? mapPost(data) : null
}
