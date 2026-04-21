import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

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
    .from('post_tags')
    .select('tag_id')
    .eq('post_id', id)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json((data ?? []).map((r) => r.tag_id))
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { tag_ids } = await request.json()

  await supabase.from('post_tags').delete().eq('post_id', id)

  if (Array.isArray(tag_ids) && tag_ids.length > 0) {
    const { error } = await supabase
      .from('post_tags')
      .insert(tag_ids.map((tag_id: string) => ({ post_id: id, tag_id })))

    if (error) return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
