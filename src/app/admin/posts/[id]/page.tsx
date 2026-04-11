'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from '../../new/page.module.css'
import TagInput from '../../components/TagInput'

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const editor = useEditor({
    immediatelyRender: false,
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
      .then((post) => {
        setTitle(post.title)
        setTags(
          (post.post_tags || []).map((pt: { tags: { name: string } | null }) => pt.tags?.name).filter(Boolean) as string[]
        )
        editor?.commands.setContent(post.content)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load post')
        setLoading(false)
      })
  }, [id, editor])

  async function saveChanges() {
    if (!editor) return
    setSaving(true)
    setError('')

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getHTML(),
        tags,
        slug,
      }),
    })

    if (res.ok) {
      router.refresh()
      router.push('/admin/posts')
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      setSaving(false)
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
      <div className={`tw-max-w-3xl tw-mx-auto tw-px-4 tw-py-8 ${styles.form}`}>
        <h1 className="tw-text-3xl tw-font-bold tw-mb-8">Edit Post</h1>

        <div>
          <label className="tw-block tw-text-sm tw-font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground tw-text-xl"
          />
        </div>

        <div className={`tw-mb-4 tw-flex tw-gap-2 tw-flex-wrap ${styles.section}`}>
          {['Bold', 'Italic', 'H2', 'H3', 'Bullet list', 'Code'].map((control) => (
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
          ))}
        </div>

        <div className="tw-border tw-border-border tw-rounded tw-mb-6 tw-min-h-96">
          <EditorContent editor={editor} />
        </div>

        <div className={styles.section}>
          <label className="tw-block tw-text-sm tw-font-medium">Tags</label>
          <TagInput value={tags} onChange={setTags} />
        </div>

        {error && <p className="tw-text-red-500 tw-mt-4">{error}</p>}

        <div className={`tw-flex tw-gap-4 ${styles.section}`}>
          <button
            onClick={() => router.push('/admin/posts')}
            className="tw-px-6 tw-py-3 tw-border tw-border-border tw-rounded hover:tw-bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            disabled={saving}
            className="tw-flex-1 tw-py-3 tw-bg-primary tw-text-primary-foreground tw-rounded tw-font-medium hover:tw-opacity-90 disabled:tw-opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
