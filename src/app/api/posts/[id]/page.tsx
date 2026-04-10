'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useParams, useRouter } from 'next/navigation'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  slug: string
  publish: boolean
}

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-64 focus:outline-none p-4',
      },
    },
  })

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data)
        setTitle(data.title)
        setTags((data.tags || []).join(', '))
        editor?.commands.setContent(data.content)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load post')
        setLoading(false)
      })
  }, [id, editor])

  async function save(publish: boolean) {
    if (!editor || !post) return
    setSaving(true)
    setError('')

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getHTML(),
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        publish,
      }),
    })

    if (res.ok) {
      router.push('/admin/posts')
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
    }
    setSaving(false)
  }

  async function deletePost() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return

    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/posts')
    } else {
      setError('Failed to delete post')
    }
  }

  if (loading) {
    return (
      <div className="tw-min-h-screen tw-bg-background tw-flex tw-items-center tw-justify-center">
        <p className="tw-text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="tw-min-h-screen tw-bg-background">
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4 tw-py-8">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-8">
          <h1 className="tw-text-3xl tw-font-bold">Edit Post</h1>

            href="/admin/posts"
            className="tw-text-sm tw-text-muted-foreground hover:tw-text-foreground"
          >
            ← All Posts
          </a>
        </div>

        <div className="tw-mb-6">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground tw-text-xl"
          />
        </div>

        <div className="tw-mb-4 tw-flex tw-gap-2 tw-flex-wrap">
          {['Bold', 'Italic', 'H2', 'H3', 'Bullet list', 'Code'].map(
            (control) => (
              <button
                key={control}
                onClick={() => {
                  if (control === 'Bold') editor?.chain().focus().toggleBold().run()
                  if (control === 'Italic') editor?.chain().focus().toggleItalic().run()
                  if (control === 'H2') editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  if (control === 'H3') editor?.chain().focus().toggleHeading({ level: 3 }).run()
                  if (control === 'Bullet list') editor?.chain().focus().toggleBulletList().run()
                  if (control === 'Code') editor?.chain().focus().toggleCode().run()
                }}
                className="tw-px-3 tw-py-1 tw-text-sm tw-border tw-border-border tw-rounded hover:tw-bg-muted"
              >
                {control}
              </button>
            )
          )}
        </div>

        <div className="tw-border tw-border-border tw-rounded tw-mb-6 tw-min-h-96">
          <EditorContent editor={editor} />
        </div>

        <div className="tw-mb-6">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2">
            Tags{' '}
            <span className="tw-text-muted-foreground tw-font-normal">
              (comma separated)
            </span>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="ai, nextjs, career"
            className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
          />
        </div>

        {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}

        <div className="tw-flex tw-gap-3">
          <button
            onClick={deletePost}
            className="tw-px-6 tw-py-3 tw-text-red-400 tw-border tw-border-red-400/30 tw-rounded hover:tw-bg-red-400/10"
          >
            Delete
          </button>
          <div className="tw-flex-1" />
          {post?.publish && (
            <button
              onClick={() => save(false)}
              disabled={saving}
              className="tw-px-6 tw-py-3 tw-border tw-border-border tw-rounded hover:tw-bg-muted disabled:tw-opacity-50"
            >
              Convert to Draft
            </button>
          )}
          <button
            onClick={() => save(post?.publish ?? false)}
            disabled={saving}
            className="tw-px-6 tw-py-3 tw-border tw-border-border tw-rounded hover:tw-bg-muted disabled:tw-opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          {!post?.publish && (
            <button
              onClick={() => save(true)}
              disabled={saving}
              className="tw-px-6 tw-py-3 tw-bg-primary tw-text-primary-foreground tw-rounded hover:tw-opacity-90 disabled:tw-opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
