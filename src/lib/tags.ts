import { createClient } from '@supabase/supabase-js'

export function normalizeTag(name: string): string {
  return name.toLowerCase().replace(/[\s\-_\.]+/g, '')
}

export function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }
  return dp[m][n]
}

type SupabaseClient = ReturnType<typeof createClient>

export async function resolvePostTags(
  postId: string,
  tagNames: string[],
  supabase: SupabaseClient
): Promise<void> {
  if (tagNames.length === 0) {
    await supabase.from('post_tags').delete().eq('post_id', postId)
    return
  }

  // Fetch all existing tags
  const { data: existingTags } = await supabase
    .from('tags')
    .select('id, name')

  const tagMap = new Map<string, { id: string; name: string }>()
  for (const tag of existingTags ?? []) {
    tagMap.set(normalizeTag(tag.name), { id: tag.id, name: tag.name })
  }

  // Resolve each tag name to an id, inserting if needed
  const tagIds: string[] = []
  for (const name of tagNames) {
    const normalized = normalizeTag(name)
    const existing = tagMap.get(normalized)
    if (existing) {
      tagIds.push(existing.id)
    } else {
      const { data: inserted } = await supabase
        .from('tags')
        .upsert({ name }, { onConflict: 'name' })
        .select('id')
        .single()
      if (inserted) {
        tagIds.push(inserted.id)
        tagMap.set(normalized, { id: inserted.id, name })
      }
    }
  }

  // Replace post_tags for this post
  await supabase.from('post_tags').delete().eq('post_id', postId)
  if (tagIds.length > 0) {
    await supabase
      .from('post_tags')
      .insert(tagIds.map((tag_id) => ({ post_id: postId, tag_id })))
  }
}
