'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import { type Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import styles from '../../new/page.module.css'
import TagPicker from '@/components/admin/TagPicker'

const TOOLBAR: { label: string; action: (e: Editor | null) => void }[] = [
  { label: 'Bold',          action: (e) => e?.chain().focus().toggleBold().run() },
  { label: 'Italic',        action: (e) => e?.chain().focus().toggleItalic().run() },
  { label: 'H1',            action: (e) => e?.chain().focus().toggleHeading({ level: 1 }).run() },
  { label: 'H2',            action: (e) => e?.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: 'H3',            action: (e) => e?.chain().focus().toggleHeading({ level: 3 }).run() },
  { label: 'Bullet list',   action: (e) => e?.chain().focus().toggleBulletList().run() },
  { label: 'Ordered list',  action: (e) => e?.chain().focus().toggleOrderedList().run() },
  { label: 'Code',          action: (e) => e?.chain().focus().toggleCode().run() },
  { label: 'Code block',    action: (e) => e?.chain().focus().toggleCodeBlock().run() },
  { label: 'Insert table',  action: (e) => e?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
]

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [displayDate, setDisplayDate] = useState('')
  const [tagIds, setTagIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Markdown,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-64 focus:outline-none p-4',
      },
    },
  })

  useEffect(() => {
    Promise.all([
      fetch(`/api/posts/${id}`).then((r) => r.json()),
      fetch(`/api/posts/${id}/tags`).then((r) => r.json()),
    ])
      .then(([post, ids]) => {
        setTitle(post.title)
        setExcerpt(post.excerpt || '')
        setDisplayDate(post.published_at ? post.published_at.slice(0, 10) : '')
        setTagIds(Array.isArray(ids) ? ids : [])
        const contentType = post.content.trim().startsWith('<') ? 'html' : 'markdown'
        editor?.commands.setContent(post.content, { contentType })
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
        content: editor.getMarkdown(),
        excerpt: excerpt.trim() || undefined,
        published_at: displayDate ? new Date(displayDate).toISOString() : undefined,
        slug,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      setSaving(false)
      return
    }

    await fetch(`/api/posts/${id}/tags`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag_ids: tagIds }),
    })

    router.refresh()
    router.push('/admin/posts')
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

        <div className={styles.section}>
          <label className="tw-block tw-text-sm tw-font-medium">Excerpt</label>
          <p className="tw-text-xs tw-text-muted-foreground">
            Optional. Shown in the frontmatter card and blog index.
          </p>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short summary or pull quote..."
            className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
          />
        </div>

        <div className={styles.section}>
          <label className="tw-block tw-text-sm tw-font-medium">Display date</label>
          <p className="tw-text-xs tw-text-muted-foreground">
            Shown on the post. Useful for backdating. Defaults to publish date if blank.
          </p>
          <input
            type="date"
            value={displayDate}
            onChange={(e) => setDisplayDate(e.target.value)}
            className="tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
          />
        </div>

        <div className={`tw-mb-4 tw-flex tw-gap-2 tw-flex-wrap ${styles.section}`}>
          {TOOLBAR.map(({ label, action }) => (
            <button
              key={label}
              onClick={() => action(editor)}
              className="tw-px-3 tw-py-1 tw-text-sm tw-border tw-border-border tw-rounded hover:tw-bg-muted"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="tw-border tw-border-border tw-rounded tw-mb-6 tw-min-h-96">
          <EditorContent editor={editor} />
        </div>

        <div className={styles.section}>
          <label className="tw-block tw-text-sm tw-font-medium">Tags</label>
          <TagPicker value={tagIds} onChange={setTagIds} />
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
