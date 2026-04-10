// src/app/api/posts/route.ts
export async function POST() {
  return Response.json({ ok: true })
}
import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, content, excerpt, tags, slug } = body

  if (!title || !content || !slug) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, excerpt, tags, slug, publish: true }])
    .select()
    .single()

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true, post: data })
}
