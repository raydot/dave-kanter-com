import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// dev.to only accepts lowercase alphanumeric tags, max 4.
function sanitizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// Always quote for YAML safety — an unquoted title containing a colon
// would otherwise break front matter parsing.
function yamlString(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: post, error } = await supabase
    .from('posts')
    .select('title, slug, content, post_tags(tags(name))')
    .eq('id', id)
    .single()

  if (error || !post) {
    return Response.json({ error: 'Post not found' }, { status: 404 })
  }

  const postTags = post.post_tags as unknown as Array<{ tags: { name: string } | null }> | null
  const tagNames = (postTags ?? [])
    .map((pt) => pt.tags?.name)
    .filter((name): name is string => Boolean(name))

  const devToTags = Array.from(new Set(tagNames.map(sanitizeTag).filter(Boolean))).slice(0, 4)

  const canonicalUrl = `https://davekanter.com/blog/${post.slug}`

  const frontMatter = [
    '---',
    `title: ${yamlString(post.title)}`,
    'published: false',
    `tags: ${devToTags.join(', ')}`,
    `canonical_url: ${canonicalUrl}`,
    '---',
  ].join('\n')

  const markdown = `${frontMatter}\n\n${post.content}\n`

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
