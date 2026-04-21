import type { Config } from '@netlify/functions'

export default async function handler() {
  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=id&limit=1`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    }
  )
  return { statusCode: 200 }
}

export const config: Config = {
  schedule: '0 0 */3 * *',
}
