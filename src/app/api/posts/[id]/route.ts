import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'
import { resolvePostTags } from '@/lib/tags'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data, error } = await supabase
    .from('posts')
    .select('*, post_tags(tags(name))')
    .eq('id', id)
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  // Separate tags from the fields going into posts table
  const { tags: tagNames, ...postFields } = body
  postFields.updated_at = new Date().toISOString()

  // Set published_at when publishing for the first time, unless caller provided one
  if (postFields.publish === true && !postFields.published_at) {
    const { data: existing } = await supabase
      .from('posts')
      .select('published_at')
      .eq('id', id)
      .single()
    if (!existing?.published_at) {
      postFields.published_at = new Date().toISOString()
    }
  }

  const { data, error } = await supabase
    .from('posts')
    .update(postFields)
    .eq('id', id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })

  // Only update tags if the key was present in the request body
  if (tagNames !== undefined) {
    await resolvePostTags(id, Array.isArray(tagNames) ? tagNames : [], supabase)
  }

  return Response.json({ ok: true, post: data })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
