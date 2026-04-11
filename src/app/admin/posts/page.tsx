'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  title: string
  slug: string
  tags: string[]
  post_tags: Array<{ tags: { name: string } }>
  publish: boolean
  published_at: string
  created_at: string
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load posts')
        setLoading(false)
      })
  }, [])

  async function togglePublish(id: string, currentPublish: boolean) {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publish: !currentPublish }),
    })
    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, publish: !currentPublish } : p))
      )
    } else {
      setError('Failed to update post')
    }
  }

  async function deletePost(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return

    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } else {
      setError('Failed to delete post')
    }
  }

  return (
    <div className="tw-min-h-screen tw-bg-background">
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4 tw-py-8">
        <h1 className="tw-text-3xl tw-font-bold tw-mb-8">All Posts</h1>

        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}

        {loading ? (
          <p className="tw-text-muted-foreground">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="tw-text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="tw-space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border tw-border-border tw-rounded"
              >
                <div className="tw-flex-1 tw-min-w-0">
                  <p className="tw-text-xs tw-text-muted-foreground" style={{ marginBottom: 0 }}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    {new Date(post.created_at).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="tw-font-medium tw-truncate" style={{ marginBottom: 0 }}>{post.title}</p>
                  {(() => {
                    const displayTags = post.post_tags?.length > 0
                      ? post.post_tags.map((pt) => pt.tags?.name).filter(Boolean)
                      : post.tags || []
                    return displayTags.length > 0 ? (
                      <p className="tw-text-xs tw-text-muted-foreground tw-truncate" style={{ marginBottom: 0 }}>
                        {displayTags.join(', ')}
                      </p>
                    ) : null
                  })()}
                  <span
                    className={`tw-text-xs tw-px-2 tw-py-0.5 tw-rounded-full tw-border ${
                      post.publish
                        ? 'tw-border-green-400 tw-text-green-400'
                        : 'tw-border-yellow-400 tw-text-yellow-400'
                    }`}
                  >
                    {post.publish ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2 tw-ml-4 tw-shrink-0">
                  {post.publish && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="tw-text-sm tw-text-muted-foreground hover:tw-text-foreground"
                    >
                      View
                    </Link>
                  )}
                  <button
                    onClick={() => togglePublish(post.id, post.publish)}
                    className="tw-text-sm hover:tw-opacity-70"
                  >
                    {post.publish ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => router.push(`/admin/posts/${post.id}`)}
                    className="tw-text-sm hover:tw-opacity-70"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id, post.title)}
                    className="tw-text-sm tw-text-red-400 hover:tw-opacity-70"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
