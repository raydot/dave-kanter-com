'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  publish: boolean
  published_at: string
  created_at: string
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-8">
          <h1 className="tw-text-3xl tw-font-bold">All Posts</h1>
          <Link
            href="/admin/new"
            className="tw-px-4 tw-py-2 tw-bg-primary tw-text-primary-foreground tw-rounded hover:tw-opacity-90"
          >
            + New Post
          </Link>
        </div>

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
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-1">
                    <span
                      className={`tw-text-xs tw-px-2 tw-py-0.5 tw-rounded-full ${
                        post.publish
                          ? 'tw-bg-green-500/20 tw-text-green-400'
                          : 'tw-bg-yellow-500/20 tw-text-yellow-400'
                      }`}
                    >
                      {post.publish ? 'Published' : 'Draft'}
                    </span>
                    <span className="tw-text-sm tw-text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="tw-font-medium tw-truncate">{post.title}</p>
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
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="tw-text-sm tw-text-primary hover:tw-opacity-70"
                  >
                    Edit
                  </Link>
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
