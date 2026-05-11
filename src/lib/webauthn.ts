import { createClient } from '@supabase/supabase-js'
import { Redis } from '@upstash/redis'

export const CHALLENGE_KEY = 'webauthn:challenge'
export const CHALLENGE_TTL = 300

export const rpID = process.env.WEBAUTHN_RP_ID!
export const rpName = process.env.WEBAUTHN_RP_NAME ?? 'Dave Kanter Blog'
export const origin = process.env.WEBAUTHN_ORIGIN!

export function getRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
