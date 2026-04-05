import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const handler = async (): Promise<{
  statusCode: number
  body: string
}> => {
  try {
    // Simple ping to keep the database active
    await redis.ping()
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Redis pinged successfully',
      }),
    }
  } catch (error) {
    console.error('Error pinging Redis:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: String(error) }),
    }
  }
}

export const config = {
  schedule: '@weekly',
}
