import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .order('name')

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  const { name } = await request.json()
  if (!name?.trim()) {
    return Response.json({ error: 'name is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('tags')
    .upsert({ name: name.trim() }, { onConflict: 'name' })
    .select('id, name')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}
