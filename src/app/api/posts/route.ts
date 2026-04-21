import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'
import { resolvePostTags } from '@/lib/tags'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, tags, publish, published_at, created_at, post_tags(tags(name))')
    .order('created_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, content, excerpt, tags: tagNames, slug, publish = false, published_at } = body

  if (!title || !content || !slug) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{
      title, content, excerpt, slug, publish,
      published_at: published_at ?? (publish ? new Date().toISOString() : null),
      updated_at: new Date().toISOString(),
    }])
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  if (Array.isArray(tagNames) && tagNames.length > 0) {
    await resolvePostTags(data.id, tagNames, supabase)
  }

  return Response.json({ ok: true, post: data })
}
