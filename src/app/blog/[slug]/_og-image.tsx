import { ImageResponse } from 'next/og'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateImageStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// Shared by opengraph-image.tsx and twitter-image.tsx — those are separate
// Next.js file conventions with no automatic overlap, so both call this.
export async function renderPostImage(slug: string): Promise<Response> {
  const post = await getPostBySlug(slug)
  if (!post) return new Response('Not found', { status: 404 })

  const tags = post.tags ?? []

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1e252c',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 28, color: '#7daedf', letterSpacing: 4 }}>
            DEAD RECKONING
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 700,
              color: '#dcdcdc',
              lineHeight: 1.25,
            }}
          >
            {post.title}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  fontSize: 22,
                  color: '#89b4fa',
                  background: 'rgba(125,174,223,0.12)',
                  border: '1px solid rgba(125,174,223,0.35)',
                  borderRadius: 6,
                  padding: '6px 16px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#7daedf' }}>
            davekanter.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
